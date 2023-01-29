import logo from './logo.svg';
import './App.css';
import CountDownTimer from './CountDownTimer';
import * as React from "react";
import "../node_modules/video-react/dist/video-react.css";
import { Player } from 'video-react';
import { InjectedConnector } from '@web3-react/injected-connector'
import { useWeb3React, getWeb3ReactContext } from '@web3-react/core';
import { ethers } from 'ethers';
import { inputFacet } from './abi';
const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
})

var DAPP_ADDRESS = "0xF119CC4Ed90379e5E0CC2e5Dd1c8F8750BAfC812"

const App = () => {
	const { activate, active, connector } = useWeb3React()
	console.log(getWeb3ReactContext().Provider)
	const hoursMinSecs = {hours:0, minutes: 5, seconds: 0}

	// Select drop down logic
	const [selected, setSelected] = React.useState("");
	const [botId2, setBot2Id] = React.useState();
	const [botId1, setBot1Id] = React.useState()
	const [gameId, setGameId] = React.useState()
	const [amount, setAmount] = React.useState()
	const [tokenAddress, setTokenAddress] = React.useState()

	const changeSelectOptionHandler = (event) => {
		setSelected(event.target.value);
	};

	var data = [
		{
		   "sender":"gowtham@outlook.com",
		   "amount":"gowtham",
		   "txnAddr":"ss",
		   "botId":"outlook010"
		},
		{
			"sender":"gowtham@outlook.com",
			"amount":"gowtham",
			"txnAddr":"ss",
			"botId":"outlook010"
		 },
		 {
			"sender":"gowtham@outlook.com",
			"amount":"gowtham",
			"txnAddr":"ss",
			"botId":"outlook010"
		 },
	 ]

	let fields = null;
	if (selected === "InitGame") {
		fields = "InitGame";
	} else if (selected === "StartGame") {
		fields = "StartGame";
	} else if (selected === "Deposit") {
		fields = "Deposit";
	} else if (selected === "Bet") {
		fields = "Bet";
	} else if (selected === "Withdraw") {
		fields = "Withdraw";
	}

	function handleConnect(){
		activate(injected)
	}

	async function handleSubmit(){
		var provider = await connector.getProvider()
		var dappContract = new ethers.Contract(DAPP_ADDRESS, inputFacet.abi , provider)
		console.log(dappContract)
		console.log(provider)
			if(selected === "InitGame") {
				dappContract.addInput(ethers.utils.toUtf8Bytes(`
					"operator": "initGame",
					"value": {
						"gameID": "${gameId}",
						"botID1": "${botId1}",
						"botID2": "${botId2}",
					}
				`))
			} else if (selected === "StartGame") {
				dappContract.addInput(ethers.utils.toUtf8Bytes(`
					"operator": "startGame",
					"value": {
						"gameID": "${gameId}",
					}
				`))
			} else if (selected === "Deposit") {
				dappContract.addInput(ethers.utils.toUtf8Bytes(`
					"operator": "deposit",
					"value": {
						"amount": "${amount}",
						"tokenAddr": "${tokenAddress}",
					}
				`))
			} else if (selected === "Bet") {
				dappContract.addInput(ethers.utils.toUtf8Bytes(`
					"operator": "bet",
					"value": {
						"gameID": "${gameId}",
						"tokenAddr": "${tokenAddress}",
						"amount": "${amount}",
					}
				`))
			} else if (selected === "Withdraw") {
				//fields = "Withdraw";
			}
	
		
	}

	function onBotId1Change(e){
		setBot1Id(e.target.value)
	}
	function onBotId2Change(e){
		setBot2Id(e.target.value)
	}
	function onGameIdChange(e){
		setGameId(e.target.value)
	}

	function onTokenAddressChange(e){
		setTokenAddress(e.target.value)
	}

	function onAmountChange(e){
		setAmount(e.target.value)
	}

	return (
		<div class='body'>
			{!active ? <button onClick={handleConnect}>Connect</button> : <div>connected</div>}

			<div>
				<h3>Select Operation</h3>
				<select onChange={changeSelectOptionHandler}>
					<option>Choose...</option>
					<option >InitGame</option>
					<option >StartGame</option>
					<option >Deposit</option>
					<option >Bet</option>
					<option>Withdraw</option>
				</select>
			</div>
			<div>
				<p className='initGame-para'>
				{ fields === "InitGame" ? 
					<div name="initGame-div-form">
						<label for="bot1Id">Bot1_ID:</label><br></br>
						<input type="text" id="bot1Id" name="bot1Id" onChange={onBotId1Change}></input>
						<pre></pre>
						<pre></pre>
						<label for="bot2Id">Bot2_ID:</label><br></br>
						<input type="text" id="bot2Id" name="bot2Id" onChange={onBotId2Change}></input>
						<pre></pre>
						<pre></pre>
						<label for="gameId">Game_ID:</label><br></br>
						<input type="text" id="gameId" name="gameId" onChange={onGameIdChange}></input>
					</div> : null 
				}</p>

				<p className='startGame-para'>
				{ fields === "StartGame" ? 
					<div name="startGame-div-form">
						<label for="gameId">Game_ID:</label><br></br>
						<input type="text" id="gameId" name="gameId" onChange={onGameIdChange}></input>
					</div> : null 
				}</p>

				<p className='deposit-para'>
				{ fields === "Deposit" ? 
					<div name="deposit-div-form">
						<label for="amount">Amount:</label><br></br>
						<input type="text" id="amount" name="amount" onChange={onAmountChange}></input>
						<pre></pre>
						<pre></pre>
						<label for="tokenAddress">TokenAddress:</label><br></br>
						<input type="text" id="tokenAddress" name="tokenAddress" onChange={onTokenAddressChange}></input>
					</div> : null 
				}</p>

				<p className='bet-para'>
				{ fields === "Bet" ? 
					<div name="bet-div-form">
					<label for="gameId">Game_ID:</label><br></br>
					<input type="text" id="gameId" name="gameId" onChange={onGameIdChange}></input>
					<pre></pre>
					<pre></pre>
					<label for="botId">Bot_ID:</label><br></br>
					<input type="text" id="bot2Id" name="bot2Id" onChange={onBotId1Change}></input>
					<pre></pre>
					<pre></pre>
					<label for="amount">Amount:</label><br></br>
					<input type="text" id="amount" name="amount" onChange={onAmountChange}></input>
					<pre></pre>
					<pre></pre>
					<label for="tokenAddress">TokenAddress:</label><br></br>
					<input type="text" id="tokenAddress" name="tokenAddress" onChange={onTokenAddressChange}></input>
				</div> : null 
				}</p>

				<p className='withdraw-para'>
				{ fields === "Withdraw" ? 
					<div name="withdraw-div-form">
					<label for="amount">Amount:</label><br></br>
					<input type="text" id="amount" name="amount"></input>
					<pre></pre>
					<pre></pre>
					<label for="tokenAddress">TokenAddress:</label><br></br>
					<input type="text" id="tokenAddress" name="tokenAddress"></input>
				</div> : null 
				}</p>
			</div>
			<button onClick={handleSubmit}>Submit</button>
			<div class='main'>
			<div class='video'>
			<Player
				playsInline
				poster="/assets/poster.png"
				src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
			/>
			</div>
			<div class='timer'>
				<CountDownTimer hoursMinSecs={hoursMinSecs}/>
			</div>	
			</div>
			<div class='bottom'>
				<h3>Bets</h3>
				<table id="table">
					<thead>
						<tr>
						<th>Sender</th>
						<th>Amount</th>
						<th>Transaction Address</th>
						<th>Bot_Id</th>
						</tr>
					</thead>
					<tbody>
						{data.map(item => {
						return (
							<tr>
							<td>{ item.sender}</td>
							<td>{ item.amount }</td>
							<td>{ item.txnAddr }</td>
							<td>{ item.botId }</td>
							</tr>
						);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default App;
