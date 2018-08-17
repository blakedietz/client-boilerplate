import red from "@material-ui/core/colors/red";

export default theme => ({
  card: {
    minWidth: 275
  },
  cardContent: {
    textAlign: "center"
  },
  button: {
    margin: theme.spacing.unit
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: "auto"
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  },
  progressIndicator: {
    flexGrow: 1,
  }
});
