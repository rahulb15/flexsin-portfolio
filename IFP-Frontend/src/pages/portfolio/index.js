import React from "react";
import { Paper, Grid, withStyles } from '@material-ui/core';
import PageTitle from "../../components/PageTitle/PageTitle";
import './style.css';
import PortfolioTable from "./table/portfolioTable" ;

const styles = theme => ({
    paper: {
        padding: theme.spacing(0),
    },
    paperTable: {
        padding: theme.spacing(0),
    }
})

const Portfolio = ({ classes, ...props }) => {
    return (
        <React.Fragment>
            {/* <PageTitle title="Portfolio" /> */}
            <Grid container spacing={4}>
                <Grid item xs={12} >
                    <Paper className={classes.paper}>
                        <PortfolioTable />
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}


export default (withStyles(styles)(Portfolio));