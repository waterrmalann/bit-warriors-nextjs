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

const statusSymbol = (status: boolean) => status ? (
	<><>{"["}</><span className="text-green-500">✓</span><>{"]"}</></>
 ) : (
 	<><>{"["}</><span className="text-red-500">⨯</span><>{"]"}</></>
 );

function RenderLineComponent(line: TerminalLine) {

	if (typeof line.content === 'string') {
		if (line.type === TerminalLineType.COMMAND) {
			return (
				<p key={line.content} className="text-neutral-500">
					{"[user] $ "} {line.content}
				</p>
			)
		} else if (line.type === TerminalLineType.ERROR) {
			return (
				<p key={line.content} className="text-red-500">
					{"! "} {line.content}
				</p>
			)
		} else {
			return (
				<p key={line.content} className="text-green-500">
					{"> "} {line.content}
				</p>
			)
		}
	} else {
		return (
			<p key={line.content.label} className="">
				{"• "}{statusSymbol(line.content.passed)}{" "} <span className="text-blue-500">{line.content.label}</span>{" "}
				{line.content.passed ? (
					<>
						<span className="text-green-400 font-bold">PASS</span>{" "}<span className="text-gray-500">{line.content.test}</span> 
					</>
				) : (
					<>
						<span className="text-red-400 font-bold">FAIL</span>{" "}<span className="text-gray-500 border-b-2 border-red-400">{line.content.test}</span><br/>
						<span className="ms-16 text-gray-500">└── <span className="border-b-2 border-red-400">{line.content.message}</span></span>
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