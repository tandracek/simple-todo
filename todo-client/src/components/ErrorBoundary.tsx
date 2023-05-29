import {ReactNode, Component} from "react";

interface Props {
  children: ReactNode
}

export default class ErrorBoundary extends Component<Props, {error: Error | null}> {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }

  static getDerivedStateFromError(error) {
    return {error};
  }

  render() {
    if (this.state.error) {
      alert(this.state.error.message);
    }

    return this.props.children;
  }
}