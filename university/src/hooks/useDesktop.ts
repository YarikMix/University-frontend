import {useEffect, useState} from "react";

export function useDesktop() {
	const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

	const updateMedia = () => {
		setIsDesktop(window.innerWidth > 768);
	};

	useEffect(() => {
		window.addEventListener("resize", updateMedia);
		return () => window.removeEventListener("resize", updateMedia);
	});

	return {
		isDesktop
	};
}