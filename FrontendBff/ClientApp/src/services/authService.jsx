import axios from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const claimsKeys = {
	claim: ['claims'],
};

const config = {
    headers: {
        'X-CSRF': '1'
    }
}

const fetchClaims = async () => 
	axios.get('/bff/user', config)
		.then((res) => res.data);

function useClaims() {
	return useQuery(
		claimsKeys.claim,
		async () => {
			return fetchClaims();
		},
		{
			staleTime: Infinity,
			cacheTime: Infinity,
			retry: false,
		}
	);
}

function useAuthUser() {
	const { data: claims, isLoading } = useClaims();
	// TODO abstract to function that takes a sid
	let logoutUrl = claims?.find((claim) => claim.type === 'bff:logout_url');
	let nameDict =
		claims?.find((claim) => claim.type === 'name') ||
		claims?.find((claim) => claim.type === 'sub');
	let username = nameDict?.value;

	const [isLoggedIn, setIsLoggedIn] = useState(false);
	useEffect(() => {
		setIsLoggedIn(!!username);
	}, [username]);

	return {
		username,
		logoutUrl,
		isLoading,
		isLoggedIn,
	};
}

export { useAuthUser };