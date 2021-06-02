const App = () => (
    <div>
        <Tweet username="Elon" msg="Doge" date="May 20th" />
        <Tweet username="Einstein" msg="I am Theory" date="June 12th" />
        <Tweet username="E" msg="MR e" date="Dec 3rd" />
    </div>
);

ReactDOM.render(<App />, document.getElementById("root"));