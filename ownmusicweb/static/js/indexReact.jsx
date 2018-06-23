var SongComponent = React.createClass({
  render: function( {
    var testStyle = { fontSize: '18px' }; // font-size in html
    return(
      <div style={testStyle}className="SongTabelle">
        This text is 18px tall
      </div>
    )
  })

});

React.render(
  console.log('I was triggered during render')
  <SongComponent />,
  document.getElementById('content')
)
