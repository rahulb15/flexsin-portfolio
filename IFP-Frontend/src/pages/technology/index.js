import React from "react";
import { Paper, Grid, withStyles } from '@material-ui/core';
import PageTitle from "../../components/PageTitle/PageTitle";
import './style.css';
import TechnologyTable from "./table/technologyTable"

const styles = theme => ({
    paper: {
        padding: theme.spacing(0),
    },
    paperTable: {
        padding: theme.spacing(0),
    }
})

const Technology = ({ classes, ...props }) => {
    return (
        <React.Fragment>
            {/* <PageTitle title="Technology" /> */}
            <Grid container spacing={4}>
                <Grid item xs={12} >
                    <Paper className={classes.paper}>
                        <TechnologyTable />
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}


export default (withStyles(styles)(Technology));