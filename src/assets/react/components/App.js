import React, { useEffect, useRef, useState } from "react";
import Player from "./Player";
import ReactLoading from "react-loading";
import { useDispatch, useSelector } from "react-redux";
import { pushLink } from "../redux/dataReducer";

export default function App() {
	const [file, setFile] = useState();
	const [value, setValue] = useState("");
	const testString = /https:\/\/([\w+?\.\w+])+([a-zA-Z0-9\~\!\@\#\$\%\^\&\*\(\)_\-\=\+\\\/\?\.\:\;\'\,]*)?/g;
	const [errorString, setError] = useState();
	const [errorClass, setErrorClass] = useState("");
	const [isReady, setIsReady] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isLinks, setIsLinks] = useState(false);

	const dispatch = useDispatch();
	const { links } = useSelector((state) => state.data);

	const submitHandler = (e) => {
		e.preventDefault();

		if (!testString.test(value)) {
			setError("Error! Invalid URL");
			setErrorClass("error");
			setTimeout(() => {
				setError("");
				setErrorClass("");
			}, 3000);
		} else {
			setFile(
				new Audio(value, {
					preload: "auto",
				})
			);
		}
	};

	useEffect(() => {
		if (file) {
			file.addEventListener("loadstart", () => {
				setIsLoading(true);
			});
			file.addEventListener("loadeddata", () => {
				console.log(file.readyState);
				if (file.readyState >= 1) {
					setIsLoading(false);
					setIsReady(true);
					dispatch(pushLink(value));
				}
			});

			file.addEventListener("error", (err) => {
				setError("Audio on this link is not available");
				setIsLoading(false);
				setErrorClass("error");
				setTimeout(() => {
					setError("");
					setErrorClass("");
				}, 3000);
			});
		}
	}, [file]);

	const backHandler = () => {
		setFile(null);
		setValue("");
		setIsReady(false);
	};

	const inputHandler = (e) => {
		setValue(e.target.value);
		if (links && !isLinks) {
			setIsLinks(true);
		}
	};

	const linkHandler = (link) => {
		setValue(link);
		setIsLinks(false);
	};

	return (
		<>
			{isReady && <Player backHandler={backHandler} url={value} />}
			{!isReady && (
				<form action="" className="form" onSubmit={submitHandler}>
					<h4 className="form__title">Insert the link</h4>
					<div className="form__container">
						{links && value && isLinks && (
							<ul className="form__link-list">
								{links
									.filter((item) => {
										let regexp = new RegExp(value, "ig");
										return regexp.test(item);
									})
									.map((link, index) => {
										return (
											<li
												key={index}
												className="form__link-item"
												onClick={() => {
													linkHandler(link);
												}}
											>
												{link}
											</li>
										);
									})}
							</ul>
						)}
						<label className="form__label">
							<input
								type="text"
								id="inpul-link"
								placeholder="https://"
								className={["form__input", errorClass].join(" ")}
								value={value}
								onChange={inputHandler}
								disabled={isLoading}
								autoComplete="off"
							/>
							{errorString && (
								<span className="form__error-icon visible">
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path
											d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
											stroke="#C6A827"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path d="M12 8V12" stroke="#C6A827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
										<circle cx="12" cy="16" r="0.5" fill="black" stroke="#C6A827" />
									</svg>
								</span>
							)}
						</label>
						<button className="form__submit" disabled={isLoading}>
							{isLoading ? (
								<ReactLoading type="spinningBubbles" color="#000000" width={40} height={40} />
							) : (
								<svg width="40" height="36" viewBox="0 0 40 36" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M39.7197 18.6943C40.0934 18.3068 40.0934 17.693 39.7197 17.3056L23.7197 0.721618L23.0253 0.00195312L21.586 1.3906L22.2803 2.11026L36.6457 16.9999H1H0V18.9999H1H36.6457L22.2803 33.8896L21.586 34.6093L23.0253 35.9979L23.7197 35.2782L39.7197 18.6943Z"
										fill="#1B191C"
									/>
								</svg>
							)}
						</button>
						{errorString && <span className="form__error visible">{errorString}</span>}
					</div>
				</form>
			)}
		</>
	);
}
