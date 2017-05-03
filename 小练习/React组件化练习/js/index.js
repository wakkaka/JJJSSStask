class MyText extends React.Component {
	render() {
		return <h1 style = {{color:this.props.color}}>Hello World</h1>;
	}
}

ReactDom.render(
	<MyText color ="red" />,
	document.getElementById('box')
)