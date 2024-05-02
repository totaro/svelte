<script>
	import Nested from './Nested.svelte';

	let name = 'SvelteWorld';
	let src = 'images/needle.jpg'
	let button ='<button>button text</button>'
	let strongtxt ='and some <strong>Strong</strong> text'

	let count = 0;
	function increment0() {
	count += 1;
}

let counter = 0;
	function increment() {
	counter += 1;
}

function decrement() {
	counter -= 1;
}

$: doubled = counter * 2;

$: {
	console.log(`the count is ${counter}`);
	console.log(`this will also be logged whenever count changes`);
}

$: if (counter >= 10) {
	alert('count is dangerously high!');
	counter = 0;
}
// -------------------------

let numbers = [1, 2, 3, 4];

	function addNumber() {
		// numbers.push(numbers.length + 1);
		numbers = [...numbers, numbers.length + 1];
	}

	$: sum = numbers.reduce((total, currentNumber) => total + currentNumber, 0);

	
// -------------------------

	import PackageInfo from './PackageInfo.svelte';

const pkg = {
	name: 'svelte',
	speed: 'blazing',
	version: 4,
	website: 'https://svelte.dev'
};

// -------------------------

let user = null;


// -------------------------
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
	let selected = colors[0];

// -------------------------
import Thing from './Thing.svelte';

let things = [
	{ id: 1, name: 'apple' },
	{ id: 2, name: 'banana' },
	{ id: 3, name: 'carrot' },
	{ id: 4, name: 'doughnut' },
	{ id: 5, name: 'egg' }
];

function handleClick() {
	things = things.slice(1);
}


let users = [{name: 'Ed', id: crypto.randomUUID()},
{name: 'Tom', id: crypto.randomUUID()},
{name: 'Kim', id: crypto.randomUUID()},
{name: 'Dave', id: crypto.randomUUID()},
{name: 'Mel', id: crypto.randomUUID()}

]

function handleClick2() {
	users = users.slice(1);
}


// ------------------------------
	let m = { x: 0, y: 0 };

	function handleMove(event) {
		m.x = event.clientX;
		m.y = event.clientY;
	}

	// ----------------------------
	
	import Inner from './Inner.svelte';

	function handleMessage(event) {
		alert(event.detail.text);
	}

	// --------------------------------

	import Outer from './Outer.svelte';

	function handleMessageOuter(event) {
		alert(event.detail.text);
	}

	// ------------------------
	let word = 'world';

	// ------------------------
	let a = 1;
	let b = 2;

	// -----------------------

	let yes = false;

	// -----------------------

	let questions = [
		{
			id: 1,
			text: `Where did you go to school?`
		},
		{
			id: 2,
			text: `What is your mother's name?`
		},
		{
			id: 3,
			text: `What is another personal fact that an attacker could easily find with Google?`
		}
	];

	selected;

	let answer = '';

	function handleSubmit() {
		alert(
			`answered question ${selected.id} (${selected.text}) with "${answer}"`
		);
	}

	// ------------------------------

	let scoops = 1;
	let flavours = [];

	const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });

	
	// ------------------------------
	import { tick } from 'svelte';

	let text = `Select some text and hit the tab key to toggle uppercase`;

	async function handleKeydown(event) {
		if (event.key !== 'Tab') return;

		event.preventDefault();

		const { selectionStart, selectionEnd, value } = this;
		const selection = value.slice(selectionStart, selectionEnd);

		const replacement = /[a-z]/.test(selection)
			? selection.toUpperCase()
			: selection.toLowerCase();

		text =
			value.slice(0, selectionStart) +
			replacement +
			value.slice(selectionEnd);

		// this has no effect, because the DOM hasn't updated yet
		await tick();
		this.selectionStart = selectionStart;
		this.selectionEnd = selectionEnd;
	}

	// --------------------------------

	import { time, elapsed } from './stores.js';

	const formatter2 = new Intl.DateTimeFormat(
		'en',
		{
			hour12: true,
			hour: 'numeric',
			minute: '2-digit',
			second: '2-digit'
		}
	);
	
	
	

</script>



<!-- CONTENT ------------------------------------- -->
<div class="app-top-bar">
<div class="top-bar-links"><a href="https://totaro.github.io/">Totaro Home</a> | <a href="https://totaro.github.io/lab/">The Lab</a></div>
</div>




<div class="content">
<h3>This is the place where I test basics of Svelte framework</h3>
<hr>
<h4>Derived store</h4>
<p>The time is {formatter2.format($time)}<p>

<p>
	This page has been open for
	{$elapsed}
	{$elapsed === 1 ? 'second' : 'seconds'}
</p>

<hr>


<h4>HTML tags</h4>
<p>This is a paragraph. {@html strongtxt}</p>
<hr>
<h4>On:click counter plus if-else</h4>


<button on:click={increment0}>
	Clicked {count}
	{count === 1 ? 'time' : 'times'}
</button>

{#if count > 10}
	<p>{count} is greater than 10</p>
{/if}

{#if count > 10}
	<p>{count} is greater than 10</p>
{:else}
	<p>{count} is between 0 and 10</p>
{/if}


{#if count > 10}
	<p>{count} is greater than 10</p>
{:else if count < 5}
	<p>{count} is less than 5</p>
{:else}
	<p>{count} is between 5 and 10</p>
{/if}

<hr>

<h4>On:click Sign in user if-else</h4>
<button on:click={() => (user = !user)}>Sign in</button>

{#if !user}
	<p>Sign in</p>
{:else}
	<p>Welcome back user</p>
{/if}

<hr>

<h4>Increment/Decrement</h4>
<button on:click={() => counter += 1}>Increment</button>
<button on:click={decrement}>Decrement</button>
<p>{counter}</p>
<p>{counter} doubled is {doubled}</p>

<hr>
<h4>Nested components and Props</h4>
<Nested answer={42} x={0} y={0}/>
<Nested />
<PackageInfo {...pkg} />

<hr>

<h4>Updating Array</h4>

<button on:click={addNumber}>
	Add a number
</button>
<p>{numbers.join(' + ')} = {sum}</p>

<hr>
<h4>Each logic</h4>
<div>
	{#each colors as color, i}
		<button class="colors"
			aria-current={selected === color}
			aria-label={color}
			style="background: {color}"
			on:click={() => selected = color}
		>{i + 1}</button>
	{/each}
</div>

<hr>
<h4>Array slice method with each logic (imported component) </h4>
<button on:click={handleClick}>
	Remove first thing
</button>

{#each things as thing (thing.id)}
	<Thing name={thing.name}/>
{/each}

<hr>
<h4>Array slice method with each logic </h4>
<button on:click={handleClick2}>
	Remove first name
</button>
{#each users as user (user.id)}
	<div><h3>
		{user.name}
	</h3></div>
{/each}

<hr>
<h4>Mouse event</h4>

<div class="divgrid">
<div class="mouse" on:pointermove={handleMove}>
	The pointer is at {m.x} x {m.y}
</div>

<div class="mouse"
	on:pointermove={(e) => {
		m = { x: e.clientX, y: e.clientY };
	}}
>
	The pointer inline is at {m.x} x {m.y}
</div>

</div>

<hr>

<h4>Event modifiers, Component events, event forwarding</h4>
<button on:click|once={() => alert('clicked')}>
	Click me
</button>

<Inner on:message={handleMessage} />

<Outer on:message={handleMessageOuter} />

<hr>
<h4>Text input binding</h4>
<div class="divgrid" style="width:50%"><p><input bind:value={word}></p>

<p>Hello {word}!</p></div>

<hr>
<h4>Numeric input binding</h4>
<div class="divgrid">
<label>
	<input type="number" bind:value={a} min="0" max="10" />
	<input type="range" bind:value={a} min="0" max="10" />
</label>

<label>
	<input type="number" bind:value={b} min="0" max="10" />
	<input type="range" bind:value={b} min="0" max="10" />
</label>
</div>
<p>{a} + {b} = {a + b}</p>

<hr>
<h4>Numeric input binding</h4>
<label>
	<input type="checkbox" bind:checked={yes} />
	Yes! Send me regular email spam
</label>

{#if yes}
	<p>
		Thank you. We will bombard your inbox and sell
		your personal details.
	</p>
{:else}
	<p>
		You must opt in to continue. If you're not
		paying, you're the product.
	</p>
{/if}

<button disabled={!yes}>Subscribe</button>

<hr>
<h4>Select binding</h4>
<h2>Insecurity questions</h2>

<form on:submit|preventDefault={handleSubmit}>
	<select
		value={selected}
		on:change={() => (answer = '')}
	>
		{#each questions as question}
			<option value={question}>
				{question.text}
			</option>
		{/each}
	</select>

	<input bind:value={answer} />

	<button disabled={!answer} type="submit">
		Submit
	</button>
</form>

<p>
	selected question {selected
		? selected.id
		: '[waiting...]'}
</p>

<hr>
<h4>Group binding</h4>
<h4>Size</h4>

{#each [1, 2, 3] as number}
	<label>
		<input
			type="radio"
			name="scoops"
			value={number}
			bind:group={scoops}
		/>

		{number} {number === 1 ? 'scoop' : 'scoops'}
	</label>
{/each}

<h4>Flavours</h4>

{#each ['cookies and cream', 'mint choc chip', 'raspberry ripple'] as flavour}
	<label>
		<input
			type="checkbox"
			name="flavours"
			value={flavour}
			bind:group={flavours}
		/>

		{flavour}
	</label>
{/each}

{#if flavours.length === 0}
	<p>Please select at least one flavour</p>
{:else if flavours.length > scoops}
	<p>Can't order more flavours than scoops!</p>
{:else}
	<p>
		You ordered {scoops} {scoops === 1 ? 'scoop' : 'scoops'}
		of {formatter.format(flavours)}
	</p>
{/if}

<hr>
<h4>Select multiple binding</h4>
<h4>Size</h4>

{#each [1, 2, 3] as number}
	<label>
		<input
			type="radio"
			name="scoops"
			value={number}
			bind:group={scoops}
		/>

		{number} {number === 1 ? 'scoop' : 'scoops'}
	</label>
{/each}

<h4>Flavours</h4>

<select multiple bind:value={flavours}>
	{#each ['cookies and cream', 'mint choc chip', 'raspberry ripple'] as flavour}
		<option>{flavour}</option>
	{/each}
</select>

{#if flavours.length === 0}
	<p>Please select at least one flavour</p>
{:else if flavours.length > scoops}
	<p>Can't order more flavours than scoops!</p>
{:else}
	<p>
		You ordered {scoops} {scoops === 1 ? 'scoop' : 'scoops'}
		of {formatter.format(flavours)}
	</p>
{/if}

<hr>
<h4>Textarea input binding</h4>
<textarea
	value={text}
	on:keydown={handleKeydown}
/>

<hr>
<h4>Dynamic attributes (Img)</h4>
<p><img src={src} alt="{src}" /></p>


<!-- content -->
</div>




<!-- styles -------------------------------- -->
<style>
	p {
		font-size: 2em;
	}

	.divgrid {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		grid-gap: 5px;
		max-width: 400px;
	}

	button.colors {
		aspect-ratio: 1;
		border-radius: 50%;
		background: var(--color, #fff);
		transform: translate(-2px,-2px);
		filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.2));
		transition: all 0.1s;
	}

	button[aria-current="true"] {
		transform: none;
		filter: none;
		box-shadow: inset 3px 3px 4px rgba(0,0,0,0.2);
	}

	div.mouse {
		left: 0;
		top: 0;
		width: 200px;
		height: 200px;
		padding: 1rem;
		border: 1px solid red;
	}

	textarea {
		flex: 1;
		resize: none;
	}

	
	textarea {
		width: 100%;
		height: 100%;
		resize: none;
	}

	



/* Global Styles */

* {
  font-family: 'Roboto', Arial, sans-serif;
  color: #616161;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}



.content{
  padding: 1rem;
  margin: 1rem;
  width:95%;
  /* height: 100vh; */
  border: 0px solid white;
  border-radius: 5px;
  background:rgba(246, 248, 246, 0.8)
}

@media screen and (max-width: 420px){

  

}

.top-bar-links{
  color: white;
  font-weight: 700;
  font-size: 1.3rem;
}
.top-bar-links a {
  color: white;
  font-weight: 700;
  font-size: 1.3rem;
  
}

@media screen and (max-width: 420px){
  
  .top-bar-links{
      color: white;
      font-weight: 700;
      font-size: 1rem;
  }
  .top-bar-links a {
      color: white;
      font-weight: 700;
      font-size: 1rem;
      
  }

}


/* Text */



h2 {
  font-size: 20px;
}

h2 {
  font-weight: lighter;
}

p {
  font-size: 14px;
}



/* Hyperlink */

a {
  cursor: pointer;
  color: #1976d2;
  text-decoration: none;
}

a:hover {
  opacity: 0.8;
}

/* Input */

input {
  font-size: 14px;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #BDBDBD;
}

label {
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 4px;
  display: block;
  text-transform: uppercase;
}

/* Button */
 button {
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 2px;
  font-size: 14px;
  cursor: pointer;
  background-color: #FF3E00;
  color: white;
  border: none;
}

button:hover {
  opacity: 0.8;
  font-weight: normal;
}




@media screen and (max-width: 420px){

 
}


/* Top Bar */

.app-top-bar {
  width: 100%;
  height: 68px;
  background: linear-gradient(0deg, rgb(255, 109, 64,1) 1%, rgba(255,62,0,1) 59%);
  padding: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin:0px;
  width: 100%;
    height: 60px;
    max-width: 2200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
}



</style>