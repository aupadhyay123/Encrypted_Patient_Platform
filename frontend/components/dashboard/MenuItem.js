export default function MenuItem(props) {
  const IconStyle = {
    width: props.size
  }

  return (
    <a>
      <img src={props.icon} style={IconStyle} />
    </a>
  );
}