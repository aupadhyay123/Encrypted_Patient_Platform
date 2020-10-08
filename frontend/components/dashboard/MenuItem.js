export default function MenuItem(props) {
  const IconStyle = {
    width: props.size
  }

  return (
    <a onClick={() => props.selectSection()}>
      <img src={props.icon} style={IconStyle} />
    </a>
  );
}