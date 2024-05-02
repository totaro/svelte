<script>
	import { count1 } from './stores.js';

	function increment() {
		// TODO increment the count
		count1.update((n) => n + 1);
	}
</script>

<button on:click={increment}>
	+
</button>
<p>textiä</p>