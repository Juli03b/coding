const App = () => (
    <div>
        <Person name="John" age={32} hobbies={['singing', 'dancing', 'cooking']} />
        <Person name="Onion" age={21} hobbies={['gaming', 'singing', 'bird watching']} />
        <Person name="Sara Dara" age={32} hobbies={['drawing', 'dancing', 'playing guitar']} />
    </div>
);

ReactDOM.render(<App />, document.getElementById("root"));