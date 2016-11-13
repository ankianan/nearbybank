let { Virtual } = window.interfaces;

class BankTuple extends Virtual.Component {
    constructor() {
        super(...arguments);

        this.state = {
            going: false,
            icon: "003e"
        }
    }
    toggle() {
        let going = !this.state.going;
        let icon;
        if (going) {
            icon = "2713";
        } else {
            icon = "003e";
        }
        this.setState({ going, icon });
    }
    render() {
		return <li className="w3-padding-16 w3-row">
			  		<div className="w3-right w3-col w3-margin-right" style={{"width": "40px"}}>
			  			<a className="w3-btn-floating w3-teal" onClick={this.toggle.bind(this)} data-icon={String.fromCharCode(parseInt(this.state.icon, 16))}></a>
			  		</div>
			  		<div className="w3-rest w3-padding-right">
			  			<span className="w3-xlarge">{this.props.name}</span><br />
			  			<span>{this.props.vicinity}</span>
			  		</div>		  
		  		</li>        
    }

}
export default BankTuple;
