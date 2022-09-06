import React from "react";
import { Paper, Grid, withStyles } from '@material-ui/core';
import PageTitle from "../../components/PageTitle/PageTitle";
import './style.css';
import FeaturesTable from "./table/FeaturesTable"

const styles = theme => ({
    paper: {
        padding: theme.spacing(0),
    },
    paperTable: {
        padding: theme.spacing(0),
    }
})

const Features = ({ classes, ...props }) => {
    return (
        <React.Fragment>
            {/* <PageTitle title="Features" /> */}
            <Grid container spacing={4}>
                <Grid item xs={12} >
                    <Paper className={classes.paper}>
                        <FeaturesTable />
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}


export default (withStyles(styles)(Features));