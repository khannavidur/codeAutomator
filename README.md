# codeAutomator - My Templating Engine


Things to take care about =>
```
    0. Exit                     [X] 
    1. Promise Chains           [X]
    2. SQL Query Hits           [X]
    3. HTTP/HTTPS Calls         [X]
    4. Stubs                    [X]
    5. boilerplates             [X]
    6. imports                  [X]
    7. prototype functions      [X]
```


Flow
```
    - Welcome Master and then ask him what he wants
    - Read Master's input
    - Ask Master the detailed requirements of the task
    - Spun out the code for Master like a pro with amazing indentation
    - Copy it to the clipboard for Master
    - Ask for Master's permisson to Exit
```

Example

```
Sir, your code slave is at your service. Your Wish is my command.

What would you like automated?
Type :
	1     to     Brew a new Promise Chain
	2     to     Brew a new SQL Query Hit
	3     to     Brew a new HTTP/HTTPS Call
	4     to     Brew a new Stub
	5     to     Brew Boiler Plate
	6     to     Brew Imports
	7     to     Brew a new prototype function
	0     to     Exit

1
Master please list the functions you need (comma separated and in order) :

v,k

Master please list the parameters (comma separated and in order) and if it returns anything to the next function in queue chain (separated by :) accepted by your function v :

a,b,c

Master please list the parameters (comma separated and in order) and if it returns anything to the next function in queue chain (separated by :) accepted by your function k :

a,b,c

Master your code -

 Q(undefined)
	.then( () => {
		return self.v(a, b, c);
	})
	.then( () => {
		return self.k(a, b, c);
	})
	.fail( (error) => {
		L.error('error in q chain', error);
	})
	.fin( () => {

	});

Everything has been copied to the clipboard for you Master!

```
