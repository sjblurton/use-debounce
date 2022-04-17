# useDebounce

useDebounce to add a delay to a action after stopping interaction. I.E. Typing into a search field, and there's a delay from stopping typing of 1 second before the search is called.

there's 3 arguments, the first is the function to delay, the second is the delay in milliseconds, and the third is the dependencies which will reset the timer.

### **import the hook...**

```bash
import useDebounce from "../hooks/use-debounce";
```

### **To call the hook...**

```bash
useDebounce(() => callAPI, 1000, [searchFieldInput])
```

### **Links**

GitHub: https://github.com/sjblurton/use-debounce
<br/>
NPM: https://www.npmjs.com/package/@sjblurton/use-debounce
