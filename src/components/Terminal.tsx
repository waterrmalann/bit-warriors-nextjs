"use client";

import { TestResult } from "@/app/(dashboard)/problems/[problem]/page";
import React, { SetStateAction } from "react";

export enum TerminalLineType {
	COMMAND,
	OUTPUT,
	ERROR,
	TEST,
}

export interface TerminalLine {
	user?: string;
	content: string | TestResult;
	type: TerminalLineType;
}

function RenderLineComponent(line: TerminalLine) {

	if (typeof line.content === 'string') {
		if (line.type === TerminalLineType.COMMAND) {
			return (
				<p className="text-neutral-500">
					{"[user] $ "} {line.content}
				</p>
			)
		} else if (line.type === TerminalLineType.ERROR) {
			return (
				<p className="text-red-500">
					{"! "} {line.content}
				</p>
			)
		} else {
			return (
				<p className="text-green-500">
					{"> "} {line.content}
				</p>
			)
		}
	} else {
		return (
			<p className="">
				<span className="text-blue-500">{line.content.label}</span>{" "}
				{line.content.passed ? (
					<>
						<span className="text-green-400">PASS</span> 
					</>
				) : (
					<>
						<span className="text-red-400">FAIL</span>{" "}
						<span className="text-gray-500">{line.content.message}</span>
					</>
				)}
			</p>
		)
	}
}


export default function Terminal({ output }: { output: TerminalLine[] }) {
	
	return (
		<div>
			{output.map(line => RenderLineComponent(line))}
		</div>
	)
}