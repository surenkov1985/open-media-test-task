import React, { useEffect, useRef, useState } from "react";

export default function Player({ backHandler, url }) {
	const AudioContext = window.AudioContext || window.webkitAudioContext;
	const [audioContext, setAudioContext] = useState(new AudioContext());
	const [gainNode, setGainNode] = useState();

	const [isPlay, setIsPlay] = useState(false);
	const [audioDuration, setAudioDuration] = useState(null);
	const [audioTime, setAudiotime] = useState(0);
	const [audioVolume, setAudioVolume] = useState(0.8);
	const [minute, setMinute] = useState();
	const [second, setSecond] = useState();
	const [timer, setTimer] = useState(null);
	const [timeValue, setTimeValue] = useState();
	const [player, setPlayer] = useState();
	const playerRef = useRef(null);
	const [track, setTrack] = useState();
	let timeInterval;

	const handleProgress = () => {
		const loaded = player.buffered.end(0);
		const total = player.duration || player.buffered.end(0);
		const progress = (loaded / total) * 100;
		setTimeValue(progress);

		console.log(progress);
	};

	useEffect(() => {
		if (playerRef.current) {
			setPlayer(playerRef.current);
		}
	}, []);

	useEffect(() => {
		console.log(audioContext);
		if (player) {
			player.volume = 0.8;
			player.addEventListener("progress", handleProgress);
			player.addEventListener("loadeddata", () => {
				if (player.readyState >= 2) {
					setAudioDuration(player.duration);
				}
			});
			setTrack(audioContext.createMediaElementSource(player));
			setGainNode(audioContext.createGain());

			return () => {
				player.removeEventListener("progress", handleProgress);
			};
		}
	}, [player]);

	useEffect(() => {
		console.log(track);
		if (track) {

			track.connect(gainNode).connect(audioContext.destination);
			gainNode.gain.volume = 0.8;
			setAudioVolume(gainNode.gain.volume);
		}
	}, [track]);

	useEffect(() => {
		if (isPlay) {
			timeInterval = setInterval(() => {
				console.log(111, player.currentTime);
				setAudiotime(player.currentTime);
				console.log(player.videoTracks);
				setMinute(
					Math.trunc(player.currentTime / 60)
						.toString()
						.padStart(2, "0")
				);
				setSecond(
					Math.round(player.currentTime % 60)
						.toString()
						.padStart(2, "0")
				);
			}, 1000);
			setTimer(timeInterval);
			player.addEventListener("ended", () => {
				if (player.ended) {
					setIsPlay(false);
				}
			});
		}
		console.log(audioTime, audioDuration);
		return clearInterval(timer);
	}, [isPlay]);

	const playHandler = () => {
		if (audioContext.state === "suspended") {
			audioContext.resume();
		}
		player.play();
		console.log(player);
		setIsPlay(true);
	};

	const pauseHandler = () => {
		if (audioContext.state === "suspended") {
			audioContext.resume();
		}
		player.pause();
		setIsPlay(false);
	};

	const timeHandler = (e) => {
		setAudiotime(e.target.value);
		player.currentTime = e.target.value;
		console.log(audioTime, audioDuration);
	};

	const volumeHandler = (e) => {
		gainNode.gain.value = e.target.value;
		console.log(gainNode);
		setAudioVolume(gainNode.gain.value);
	};

	return (
		<div className="player">
			<button
				className="player__title"
				onClick={() => {
					backHandler();
					player.pause();
					setIsPlay(false);
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
					<audio src={url} ref={playerRef} crossOrigin="anonymous" />
					<span style={{ backgroundSize: `${timeValue}% 100%` }}></span>
					<input
						type="range"
						min={0}
						max={audioDuration}
						style={{ backgroundSize: `${(audioTime / audioDuration) * 100 || audioTime}% 100%` }}
						step="0.1"
						value={audioTime}
						onChange={timeHandler}
					/>
				</label>
				<div className="player__volume-row">
					<div className="player__taimer">
						<span>
							{minute || "00"}:{second || "00"}
						</span>
					</div>
					<div>
						<label className="player__volume-control">
							<input
								type="range"
								min={0}
								max={1}
								step={0.01}
								style={{ backgroundSize: `${audioVolume * 100}% 100%` }}
								value={audioVolume}
								onChange={volumeHandler}
							/>
						</label>
					</div>
				</div>
			</div>
		</div>
	);
}
