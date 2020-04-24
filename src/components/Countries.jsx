import React from 'react';
import Header from './Header';
import Loading from './Loading';
import Error from './Error';
import styles from '../styles/Countries.module.scss';

class Countries extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sort: {
                category: "Confirmed",
                reverse: false
            }
        }

        this.categories = ["Country", "Confirmed", "Today confirmed", "Deaths", "Today deaths", "Deaths rate", "Recovered", "Recovery rate", "Active", "Critical"];

        this.processCountriesData = this.processCountriesData.bind(this);
        this.sortData = this.sortData.bind(this);
        this.handleActiveCategoryChange = this.handleActiveCategoryChange.bind(this);
    }

    processCountriesData(obj) {
        let processedObj = {};

        for (let prop in obj) {
            if (typeof(obj[prop]) === "object" && obj[prop]) {
                processedObj[prop] = this.processCountriesData(obj[prop]);
            } else if (typeof(obj[prop]) === "number") {
                processedObj[prop] =  obj[prop] === 0 ? "-" : obj[prop].toLocaleString("ru");
            }
        }

        if ("name" in obj) {
            processedObj.latest_data.calculated.death_rate = (Math.round(obj.latest_data.calculated.death_rate * 100) / 100) + "%";
            processedObj.latest_data.calculated.recovery_rate = (Math.round(obj.latest_data.calculated.recovery_rate * 100) / 100) + "%";
        }

        return processedObj;
    }

    sortData() {
        switch(this.state.sort.category) {
            case "Country":
                this.props.countries.data.sort((a, b) => compareStrings(a.name, b.name, this.state.sort.reverse));
                break;
            case "Confirmed":
                this.props.countries.data.sort((a, b) => compareNumbers(a.latest_data.confirmed, b.latest_data.confirmed, this.state.sort.reverse));
                break;
            case "Today confirmed":
                this.props.countries.data.sort((a, b) => compareNumbers(a.today.confirmed, b.today.confirmed, this.state.sort.reverse));
                break;
            case "Deaths":
                this.props.countries.data.sort((a, b) => compareNumbers(a.latest_data.deaths, b.latest_data.deaths, this.state.sort.reverse));
                break;
            case "Today deaths":
                this.props.countries.data.sort((a, b) => compareNumbers(a.today.deaths, b.today.deaths, this.state.sort.reverse));
                break;
            case "Deaths rate":
                this.props.countries.data.sort((a, b) => compareNumbers(a.latest_data.calculated.death_rate, b.latest_data.calculated.death_rate, this.state.sort.reverse));
                break;
            case "Recovered":
                this.props.countries.data.sort((a, b) => compareNumbers(a.latest_data.recovered, b.latest_data.recovered, this.state.sort.reverse));
                break;
            case "Recovery rate":
                this.props.countries.data.sort((a, b) => compareNumbers(a.latest_data.calculated.recovery_rate, b.latest_data.calculated.recovery_rate, this.state.sort.reverse));
                break;
            case "Active":
                this.props.countries.data.sort((a, b) => compareNumbers(a.latest_data.active, b.latest_data.active, this.state.sort.reverse));
                break;
            case "Critical":
                this.props.countries.data.sort((a, b) => compareNumbers(a.latest_data.critical, b.latest_data.critical, this.state.sort.reverse));
                break;
            default:
                break;
        }

        function compareNumbers(a, b, reverse) {
            if (reverse) {
                return a - b;
            } else {
                return b - a;
            }
        }

        function compareStrings(a, b, reverse) {
            if (reverse) {
                return a.localeCompare(b);
            } else {
                return b.localeCompare(a);
            }
        }
    }

    handleActiveCategoryChange(category) {
        if (category === this.state.sort.category) {
            this.setState(state => ({
                sort: {
                    category: state.sort.category,
                    reverse: !state.sort.reverse
                }
            }));
        } else {
            this.setState(() => ({
                sort: {
                    category,
                    reverse: false
                }
            }));
        }
    }

    render() {
        let containerInner;

        if (Object.keys(this.props.countries).length) {
            if ("message" in this.props.countries) {
                containerInner = <Error message={this.props.countries.message}></Error>
            } else {
                this.sortData();

                let tBody = this.props.countries.data.map(country => {

                    let processedCountryData = this.processCountriesData(country);

                    return (
                        <tr className={styles["table-row"]} key={country.code}>
                            <td>{country.name}</td>
                            <td className="confirmed">{processedCountryData.latest_data.confirmed}</td>
                            <td className="confirmed">{processedCountryData.today.confirmed}</td>
                            <td className="deaths">{processedCountryData.latest_data.deaths}</td>
                            <td className="deaths">{processedCountryData.today.deaths}</td>
                            <td className="deaths">{processedCountryData.latest_data.calculated.death_rate}</td>
                            <td className="recovered">{processedCountryData.latest_data.recovered}</td>
                            <td className="recovered">{processedCountryData.latest_data.calculated.recovery_rate}</td>
                            <td className="active">{processedCountryData.latest_data.active}</td>
                            <td className="critical">{processedCountryData.latest_data.critical}</td>
                        </tr>
                    )
                });

                let tHead = this.categories.map(category => {
                    let classes = category === this.state.sort.category ? `${styles["category-name"]} ${styles["active-category"]}` : styles["category-name"];

                    return (
                        <th className={classes} key={category} onClick={() => this.handleActiveCategoryChange(category)}>{category}</th>
                    );
                })
    
                containerInner = (
                    <>
                        <Header header="Countries"></Header>
                        <div className={styles.data}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        {tHead}
                                    </tr>
                                </thead>
                                <tbody>
                                    {tBody}
                                </tbody>
                            </table>
                        </div>
                    </>
                );
            }
        } else {
            containerInner = <Loading></Loading>;
        }

        return (
            <div className={styles.container}>
                {containerInner}
            </div>
        );
    }
}

export default Countries;