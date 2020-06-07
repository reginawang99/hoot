import React, {useState} from 'react';
import {DOMAIN } from '../../config';
import "./lightbox.css"


export function LightBoxImage(props) {
  return <img 
  	className="hover-shadow cursor" 
  	onClick={()=>props.onClick(props.src)} 
  	src={DOMAIN + `${props.src}`} 
  />
}

export function LightBoxModal(props) {
	if (props.open) {
		return (<div onClick={()=>props.onClick(null)} className="modal">

			<img className="modal-content" src={DOMAIN + `/${props.src}`} />
			<span className="close" >x </span>
		</div>)
	}

	return null
}

