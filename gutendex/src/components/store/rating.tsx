"use client";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { CiStar } from "react-icons/ci";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { cn } from "@/utils/cn";
interface RatingProps {
	ratingCount: number;
	upperDownloadCountLimit?: number;
	mini?: boolean;
}

export class Rating extends Component<RatingProps> {
	static propTypes = {
		ratingCount: PropTypes.number,
		upperDownloadCountLimit: PropTypes.number,
		mini: PropTypes.bool,
	};

	rating =
		(this.props.ratingCount / (this.props.upperDownloadCountLimit ?? 1)) *
		5;

	getRating(rating: number): React.ReactElement[] {
		const halfCheck = Math.round(rating * 2) / 2;
		const capped = Math.min(halfCheck, 5);
		const full_stars = Math.floor(capped);
		const half_stars = capped % 1 === 0 ? 0 : 1;
		const empty_stars = 5 - full_stars - half_stars;

		const stars: React.ReactElement[] = [];
		for (let i = 0; i < full_stars; i++) {
			stars.push(<FullStar key={`full-${i}`} />);
		}
		if (half_stars) {
			stars.push(<HalfStar key="half-0" />);
		}
		for (let i = 0; i < empty_stars; i++) {
			stars.push(<Star key={`empty-${i}`} />);
		}
		return stars;
	}

	render() {
		const stars = this.getRating(this.rating ?? 0);
		const upper = this.props.upperDownloadCountLimit ?? 1;
		return (
			<div className="flex flex-col w-full text-sm  text-secondary ">
				<span className={cn(this.props.mini ? "hidden" : "")}>
					popularity:
				</span>
				<div className="flex flex-row w-full h-5 items-center gap-1">
					<div>
						<span className="text-sm font-semibold text-tertiary text-center self-center justify-self-center h-full">
							{Math.round(
								(this.props.ratingCount / upper) * 5
							).toFixed(2)}
						</span>
					</div>
					<div className="grid grid-cols-5 grid-rows-0 h-4 ">
						{stars}
					</div>

					<span
						className="text-sm text-tertiary inline-block text-center self-center justify-self-center h-full"
						role="note"
						aria-label={`Downloads: ${this.props.ratingCount.toLocaleString()}`}
						title={`Downloads: ${this.props.ratingCount.toLocaleString()}`}>
						(
						{new Intl.NumberFormat("en", {
							notation: "compact",
							maximumFractionDigits: 1,
						}).format(this.props.ratingCount)}
						)
					</span>
				</div>
			</div>
		);
	}
}

export default Rating;

// Star components

export class HalfStar extends Component {
	render() {
		return (
			<div id="half-star" className="grid grid-cols-1 grid-rows-1 h-full">
				<FaStarHalf
					className={cn(
						"row-start-1 col-start-1",
						"p-0.5",
						"h-full",
						"",
						""
					)}
				/>
				<CiStar
					className={cn("row-start-1 col-start-1", "h-full", "", "")}
				/>
			</div>
		);
	}
}

export class Star extends Component {
	render() {
		return <CiStar className={cn("h-full", "")} />;
	}
}
export class FullStar extends Component {
	render() {
		return <FaStar className={cn("p-0.5", "h-full", "", "")} />;
	}
}
