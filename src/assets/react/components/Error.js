import React from 'react'

export default function Error({error}) {
  return (
		<div className="error">
			<div className="error__icon">
				<svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M2.96008 14.0081L0.488083 14.0081L0.488083 16.0001L2.96008 16.0001L2.96008 14.0081ZM2.69608 0.04006L0.776084 0.0400599L0.776083 12.0401L2.69608 12.0401L2.69608 0.04006Z"
						fill="black"
					/>
				</svg>
			</div>
			<div className="error__content">
				<p className="error__title">Warning</p>
				<p className="error__text">{error}</p>
			</div>
			<button className="error__close" onClick={closeError}>
				<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M20 2L2 20" stroke="#767577" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" />
					<path d="M2 2L20 20" stroke="#767577" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" />
				</svg>
			</button>
		</div>
  );
}
