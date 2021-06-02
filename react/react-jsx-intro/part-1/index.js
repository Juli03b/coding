const App = () => (
    <div>
        <FirstComponent />
        <NamedComponent name="toosi" />
    </div>
);

ReactDOM.render(<App />, document.getElementById("root"))