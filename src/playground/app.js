class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOptionSingular = this.handleDeleteOptionSingular.bind(this);
        this.state = {
            options: []
        };
    }

    componentDidMount() {
        try {

            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            
            if(options) {
                this.setState(() => ({options}));
            }
        }

         catch(e) {

        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.options.length !== this.state.options.length);
        const json = JSON.stringify(this.state.options);
        localStorage.setItem('options', json);
        console.log(localStorage);
    }

    componentWillUnmount() {
        console.log('bla');
    }

    handleDeleteOptions() {
        this.setState(() => ({options: []}));
    }

    handleDeleteOptionSingular(optionToRemove) {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => {
                return optionToRemove !== option;
            })
        }));
    }

    handlePick() {
        const random = Math.floor(Math.random() * this.state.options.length);
         console.log(this.state.options[random]);

    }

    handleAddOption(option) {
        if(!option) {
            return 'Enter valid value to add item!';
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This option already exists!';
        }

        this.setState((prevState) => ({options: prevState.options.concat([option])}));
    }

    render() {

        const subtitle ='Subtitle'; 

        return (
            <div>
                <Header subtitle = {subtitle} />
                <Action 
                    hasOptions={this.state.options.length > 0}
                    handlePick = {this.handlePick}
                    />
                <Options 
                    handleDeleteOptionSingular = {this.handleDeleteOptionSingular}
                    options={this.state.options} 
                    handleDeleteOptions = {this.handleDeleteOptions}
                />
                <AddOptions handleAddOption = {this.handleAddOption} />
            </div>
        );
    }
}

const Header = (props) => {
    return(
        <div>
            <h1>{props.title}</h1>
            {props.subtitle && <h2>{props.subtitle}</h2>}
        </div>
    )
}

Header.defaultProps = {
    title: 'Indecision',

};

const Action = (props) => {
    return(
        <div>
        <button onClick={props.handlePick}
        disabled={!props.hasOptions}
        >
            What should I do?
        </button>
    </div>
    )
}

const Options = (props) => {
    return (
        <div>
            <button onClick={props.handleDeleteOptions}>Remove</button>
            {props.options.length === 0 && <p>Please add an option to get started!</p>}
            {
                props.options.map((option) => <Option key={option} optionText={option} handleDeleteOptionSingular = {props.handleDeleteOptionSingular} />)    
            }
        </div>
    )
}

const Option = (props) => {
    return(
        <div>
            <p>{props.optionText}</p>
            <button onClick={(e) => {
                props.handleDeleteOptionSingular(props.optionText);
            }}>
                Remove
            </button>
        </div>
    )
}

class AddOptions extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error: undefined
        };
    }

    handleAddOption(e) {
        e.preventDefault();

        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);

        this.setState(() => ({error: error}));

        if(!error) {
            e.target.elements.option.value = '';
        }
    }

    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input name='option' type='text'></input>
                    <button type='submit'>Add Option</button>
                </form>
            </div>
        )
    }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'))