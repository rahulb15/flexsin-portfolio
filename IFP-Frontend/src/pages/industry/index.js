import React from "react";
import { Paper, Grid, withStyles } from '@material-ui/core';
import PageTitle from "../../components/PageTitle/PageTitle";
import './style.css';
import IndustryTable from "./table/IndustryTable"

const styles = theme => ({
    paper: {
        padding: theme.spacing(0),
    },
    paperTable: {
        padding: theme.spacing(0),
    }
})

const Industry = ({ classes, ...props }) => {
    return (
        <React.Fragment>
            {/* <PageTitle title="Industry" /> */}
            <Grid container spacing={4}>
                <Grid item xs={12} >
                    <Paper className={classes.paper}>
                        <IndustryTable />
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}


export default (withStyles(styles)(Industry));