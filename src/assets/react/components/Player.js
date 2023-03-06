import React, { useEffect, useState } from "react";

export default function Player({ file, backHandler, url, buffered }) {
	const [isPlay, setIsPlay] = useState(false);
	const [audioDuration, setAudioDuration] = useState(null);
	const [audioTime, setAudiotime] = useState(0);
	const [audioVolume, setAudioVolume] = useState(0);
	const [minute, setMinute] = useState();
	const [second, setSecond] = useState();
	const [timer, setTimer] = useState(null);
	const [timeValue, setTimeValue] = useState();
	let timeInterval;

	const handleProgress = () => {
		const loaded = (file.buffered.end(0));
		const total = file.duration || file.buffered.end(0);
		const progress = (loaded / total) * 100;
		setTimeValue(progress);

		console.log(progress);
	};

	useEffect(() => {
		if (file) {
			setAudioDuration(file.duration);
			setAudioVolume(file.volume);
			file.addEventListener("progress", handleProgress);
			return () => {
				file.removeEventListener("progress", handleProgress);
			};
		}
	}, []);
	useEffect(() => {
		if (isPlay) {
			timeInterval = setInterval(() => {
				console.log(111, file.currentTime);
				setAudiotime(file.currentTime);
				setMinute(
					Math.trunc(file.currentTime / 60)
						.toString()
						.padStart(2, "0")
				);
				setSecond(
					Math.round(file.currentTime % 60)
						.toString()
						.padStart(2, "0")
				);
			}, 1000);
			setTimer(timeInterval);
		}
		return clearInterval(timer);
	}, [isPlay]);

	const playHandler = () => {
		file.play();
		setIsPlay(true);
		setAudioDuration(file.duration);
	};

	const pauseHandler = () => {
		file.pause();
		setIsPlay(false);
	};

	const timeHandler = (e) => {
		console.log(e);
		setAudiotime(e.target.value);
		file.currentTime = e.target.value;
	};

	const volumeHandler = (e) => {
		setAudioVolume(e.target.value);
		file.volume = e.target.value;
	};

	return (
		<div className="player">
			<button
				className="player__title"
				onClick={() => {
					backHandler();
					file.pause();
				}}
			>
				&#8592; Back
			</button>
			<div className="player__container">
				{!isPlay ? (
					<button className="player__play" onClick={playHandler}>
						<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M0 40V0H4.34286L40 18.7952V20.9639L4.34286 40H0Z" fill="white" />
						</svg>
					</button>
				) : (
					<button className="player__play" onClick={pauseHandler}>
						<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
							<rect x="4" width="4" height="40" fill="white" />
							<rect x="32" width="4" height="40" fill="white" />
						</svg>
					</button>
				)}
				<label className="player__progress-control">
					<span style={{ backgroundSize: `${timeValue}% 100%` }}></span>
					<input
						type="range"
						min={0}
						max={audioDuration ? audioDuration : 200}
						style={{ backgroundSize: `${(audioTime / audioDuration) * 100 || audioTime}% 100%` }}
						step="0.1"
						value={audioTime}
						onChange={timeHandler}
					/>
				</label>
				<div className="player__volume-row">
					<div>
						<span>
							{minute || "00"} : {second || "00"}
						</span>
					</div>
					<div>
						<label className="player__volume-control">
							<input type="range" min={0} max={1} step={0.1} value={audioVolume} onChange={volumeHandler} />
						</label>
					</div>
				</div>
			</div>
		</div>
	);
}
