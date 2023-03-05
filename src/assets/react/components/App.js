import React, { useState } from "react";
import Player from "./Player";

export default function App() {
	const [file, setFile] = useState(
		// new Audio("https://lalalai.s3.us-west-2.amazonaws.com/media/split/a7564eb8-cbf2-40e2-9cb8-6061d8d055a7/no_vocals")
        // new Audio("https://ia800300.us.archive.org/17/items/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4")
	);
	const [value, setValue] = useState("");
	console.log(file);

	const submitHandler = (e) => {
		e.preventDefault();
		console.log(new Audio(value));
		setFile(new Audio(value));
		
	};

    const backHandler = () => {
        setFile(null)
    }

	return (
		<>
			{file && (
				<Player file={file} backHandler={backHandler}/>
			)}
			{!file && (
				<form action="" className="form" onSubmit={submitHandler}>
					<h4 className="form__title">Insert the link</h4>
					<div className="form__container">
						<label className="form__label">
							<input
								type="text"
								id="inpul-link"
								placeholder="https://"
								className="form__input"
								onChange={(e) => {
									setValue(e.target.value);
								}}
							/>
							<span className="form__error-icon">
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
						</label>
						<button className="form__submit">
							<svg width="40" height="36" viewBox="0 0 40 36" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M39.7197 18.6943C40.0934 18.3068 40.0934 17.693 39.7197 17.3056L23.7197 0.721618L23.0253 0.00195312L21.586 1.3906L22.2803 2.11026L36.6457 16.9999H1H0V18.9999H1H36.6457L22.2803 33.8896L21.586 34.6093L23.0253 35.9979L23.7197 35.2782L39.7197 18.6943Z"
									fill="#1B191C"
								/>
							</svg>
						</button>
						<span className="form__error">Error message here</span>
					</div>
				</form>
			)}
		</>
	);
}
