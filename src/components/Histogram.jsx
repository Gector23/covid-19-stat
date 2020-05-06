import React from 'react';
import styles from '../styles/Histogram.module.scss';

class Histogram extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            category: "confirmed"
        };

        this.graphRef = React.createRef();

        this.categoryNames = ["confirmed", "deaths", "recovered"];
    }

    handleCategoryChange(newCategory) {
        this.setState(() => {
            return {category: newCategory};
        });
    }

    componentDidMount() {
        let maxCases = 0;

        for (let i = 0; i < this.props.days.length; i++) {
            if (maxCases < this.props.days[i][this.state.category].origin) maxCases = this.props.days[i][this.state.category].origin;
        }

        setTimeout(() => {
            for (let i = 0; i < this.graphRef.current.children.length; i++) {
                this.graphRef.current.children[i].style.height = `${this.props.days[i][this.state.category].origin / (maxCases / 100)}%`;
            }
        }, 1000);
    }

    componentDidUpdate() {
        let maxCases = 0;

        for (let i = 0; i < this.props.days.length; i++) {
            if (maxCases < this.props.days[i][this.state.category].origin) maxCases = this.props.days[i][this.state.category].origin;
        }

        for (let i = 0; i < this.graphRef.current.children.length; i++) {
            this.graphRef.current.children[i].style.height = `${this.props.days[i][this.state.category].origin / (maxCases / 100)}%`;
        }
    }

    render() {
        let columns = [];

        for (let i = 0; i < this.props.days.length; i++) {
            const classes = `${styles.column}  ${styles[this.state.category + "-column"]}`;

            columns.push(
                <div className={classes} key={i}></div>
            );
        }

        let categories = this.categoryNames.map( (categoryName, index) => {
            const classes = categoryName === this.state.category ? `${styles.category} active-element` : styles.category;

            return (
                <div className={classes} key={index} onClick={() => this.handleCategoryChange(categoryName)}>
                    <span>{categoryName[0].toUpperCase() + categoryName.slice(1)}</span>
                </div>
            );
        });

        return(
            <div>
                <div className={styles.graph} ref={this.graphRef}>
                    {columns}
                </div>
                <div className={styles.categories}>
                    {categories}
                </div>
            </div>
        );
    }
}

export default Histogram;