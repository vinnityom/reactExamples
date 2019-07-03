// Реализуйте компонент, эмулирующий работу слайдера.

class Carousel extends React.Component {
  state = { activeImage: 0 }

  onNextClick = () => {
    const { activeImage } = this.state;
    const { images: { length } } = this.props;
    const nextIndex = activeImage + 1;
    const nextImageIndex = nextIndex === length ? 0 : nextIndex;
    this.setState({ activeImage: nextImageIndex });
  };

  onPrevClick = () => {
    const { activeImage } = this.state;
    const { images: { length } } = this.props;
    const prevIndex = activeImage - 1;
    const prevImageIndex = prevIndex < 0 ? length - 1 : prevIndex;
    this.setState({ activeImage: prevImageIndex });
  };

  render() {
    const { images } = this.props;
    const proccessedImages = images.map((image, index) => {
      const { activeImage } = this.state;
      const classes = cn({
        'carousel-item': true,
        active: index === activeImage,
      });
      return (
        <div className={classes} key={index}>
          <img alt="" className="d-block w-100" src={image} />
        </div>
      );
    });

    return (
      <div id="carousel" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">{proccessedImages}</div>
        <a
          className="carousel-control-prev"
          href="#carousel"
          role="button"
          data-slide="prev"
          onClick={this.onPrevClick}
        >
          <span className="carousel-control-prev-icon" />
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carousel"
          role="button"
          data-slide="next"
          onClick={this.onNextClick}
        >
          <span className="carousel-control-next-icon" />
          <span className="sr-only">Next</span>
        </a>
      </div>
    );
  }
}

// Реализуйте компонент <Collapse>, который по клику на ссылке отображает свое содержимое и при повторном - прячет. 

class Collaps extends React.Component {
  static defaultProps = {
    opened: true,
  }

  state = { opened: this.props.opened };

  toggleText = () => this.setState({ opened: !this.state.opened });

  render() {
    const { opened } = this.state;
    const { text } = this.props;
    const classes = cn({
      collapse: true,
      show: opened,
    });

    return (
      <div>
        <p>
          <a className="btn btn-primary" href="#" onClick={this.toggleText}>Link with href</a>
        </p>
        <div className={classes}>
          <div className="card card-body">{text}</div>
        </div>
      </div>
    );
  }
}

// Реализуйте компонент, который представляет из себя две кнопки и лог событий:

class Component extends React.Component {
  state = { log: [] };

  increase = () => {
    const { log } = this.state;
    const prevItem = log[0] || { value: 0 };
    const newLog = [{ id: _.uniqueId(), value: prevItem.value + 1 }, ...log];
    this.setState({ log: newLog });
  }

  decrease = () => {
    const { log } = this.state;
    const prevItem = log[0] || { value: 0 };
    const newLog = [{ id: _.uniqueId(), value: prevItem.value - 1 }, ...log];
    this.setState({ log: newLog });
  }

  deleteItem = id => (e) => {
    e.preventDefault();
    const { log } = this.state;
    const newLog = log.filter(item => item.id !== id);
    this.setState({ log: newLog });
  }

  renderLog = () => {
    const { log } = this.state;
    return (
      <div className="list-group">
        {log.map(logItem => (<button onClick={this.deleteItem(logItem.id)} key={logItem.id} type="button" className="list-group-item list-group-item-action">{logItem.value}</button>))}
      </div>
    );
  }

  render() {
    const { log } = this.state;
    return (
      <div>
        <div className="btn-group" role="group">
          <button onClick={this.increase} type="button" className="btn hexlet-inc">+</button>
          <button onClick={this.decrease} type="button" className="btn hexlet-dec">-</button>
        </div>
        {log.length > 0 ? this.renderLog() : null}
      </div>
    );
  }
}

// Card component

const Body = ({ children }) => <div className="card-body">{children}</div>;
const Title = ({ children }) => <h4 className="card-title">{children}</h4>;
const Text = ({ children }) => <p className="card-text">{children}</p>;

class Card extends React.Component {
  static Body = Body;

  static Title = Title;

  static Text = Text;

  render() {
    const { children } = this.props;

    return <div className="card">{children}</div>;
  }
}

//Реализуйте компонент <Modal> (Модальное окно)

const Header = ({ toggle, children }) => (
  <div className="modal-header">
    <div className="modal-title">{children}</div>
    <button onClick={toggle} type="button" className="close" data-dismiss="modal" aria-label="Close">
      <span aria-hidden="true">×</span>
    </button>
  </div>
);

const Body = ({ children }) => <p className="modal-body">{children}</p>;

const Footer = ({ children }) => (
  <p className="modal-footer">
    {children}
  </p>
);

class Modal extends React.Component {
  static Header = Header;

  static Body = Body;

  static Footer = Footer;

  render() {
    const { isOpen, children } = this.props;
    const classes = cn({
      modal: true,
      fade: isOpen,
      show: isOpen,
    });

    const display = isOpen ? 'block' : 'none';
    const style = { display };

    return (
      <div className={classes} style={style}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">{children}</div>
        </div>
      </div>
    );
  }
}
