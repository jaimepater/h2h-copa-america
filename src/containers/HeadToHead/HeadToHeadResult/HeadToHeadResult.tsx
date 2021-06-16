import React, { FunctionComponent } from 'react';
import { Grid, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import {
  FixtureResponse,
  FootballApiResult,
  PredictionsResponse,
} from '../../../definitions/types';
import { footballApiCall } from '../../../core/httpCall';
import ScoresHistory from '../ScoresHistory/ScoresHistory';
import ScoresHistoryPercentage from '../ScoresHistoryPercentage/ScoresHistoryPercentage';
import Predictions from '../Predictions/Predictions';

interface HeadToHeadResultProps {
  fixtureResponse: FixtureResponse;
}

const CountryImage = styled.img`
  height: 100px;
`;

const HeadToHeadResult: FunctionComponent<HeadToHeadResultProps> = ({ fixtureResponse }) => {
  const { t } = useTranslation();
  const {
    fixture: { id },
    teams: {
      home: { logo: homeLogo },
      away: { logo: awayLogo },
    },
  } = fixtureResponse;

  const { data: predictionsResponse } = useQuery<FootballApiResult<PredictionsResponse[]>, string>(
    `predictions${id}`,
    () => footballApiCall<FootballApiResult<PredictionsResponse[]>>(`predictions?fixture=${id}`),
  );

  const fixtures = predictionsResponse?.data.response?.[0].h2h;
  const predictions = predictionsResponse?.data.response?.[0].predictions;

  return (
    <>
      <Grid container spacing={8} justify="center">
        <Grid item>
          <CountryImage src={homeLogo} />
        </Grid>
        <Grid item>
          <CountryImage src={awayLogo} />
        </Grid>
      </Grid>
      <Typography variant="h5">{t('Predictions')}</Typography>
      {predictions && <Predictions predictions={predictions} />}
      <Typography variant="h5">{t('historyScores')}</Typography>
      {fixtures && <ScoresHistory fixturesResponse={fixtures} />}
      <Typography variant="h5">{t('historyScoresPercentage')}</Typography>
      {fixtures && <ScoresHistoryPercentage fixturesResponse={fixtures} />}
    </>
  );
};
export default HeadToHeadResult;
