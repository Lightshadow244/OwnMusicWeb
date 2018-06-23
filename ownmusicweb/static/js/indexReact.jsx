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
  <SongComponent />,
  document.getElementById('content')
)
