import React, { FunctionComponent } from 'react';
import { Grid, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Predictions as PredictionsDefinition } from '../../../definitions/types';

interface PredictionsProps {
  predictions: PredictionsDefinition;
}

const CountryImage = styled.img`
  height: 100px;
`;

const Container = styled(Grid)`
  width: 100%;
`;

const Predictions: FunctionComponent<PredictionsProps> = ({
  predictions: {
    goals: { home, away },
    winner: { id, comment },
    advice,
    // eslint-disable-next-line camelcase
    under_over,
  },
}) => {
  const { t } = useTranslation();
  return (
    <Grid container>
      <Container item>
        <Grid container spacing={8} justify="center">
          <Grid item>
            <Typography variant="h3">{home}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h3">{away}</Typography>
          </Grid>
        </Grid>
        <Grid container justify="center">
          <Grid item xs={3}>
            <CountryImage src={`https://media.api-sports.io/football/teams/${id}.png`} />
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="h6">{comment}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6">{advice}</Typography>
        </Grid>
        <Grid item>
          {/* eslint-disable-next-line camelcase */}
          <Typography variant="h6">{`${t('underOver')} ${under_over}`}</Typography>
        </Grid>
      </Container>
    </Grid>
  );
};

export default Predictions;
