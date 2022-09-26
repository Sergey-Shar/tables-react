import { useEffect, useState } from "react";

export const useDebounce = (value: string, delay = 3000): string => {
	const [debounced, setDebounced] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => setDebounced(value), delay);
		return () => clearTimeout(handler);
	}, [delay, value]);

	return debounced;
};
