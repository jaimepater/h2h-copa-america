import React, { FunctionComponent } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { filter, map } from 'ramda';
import { FixtureResponse, Goals } from '../../../definitions/types';
import { getGoals } from '../../../utils/utils';

interface ScoresHistoryPercentageProps {
  fixturesResponse: FixtureResponse[];
}

const ScoresHistoryPercentage: FunctionComponent<ScoresHistoryPercentageProps> = ({
  fixturesResponse,
}) => {
  const { t } = useTranslation();
  const findScore = (goals: Goals) =>
    filter(
      (fixture: FixtureResponse) =>
        goals.away === fixture.goals.away && goals.home === fixture.goals.home,
    );
  const getPercentage = (total: number, value: number) => (value / total) * 100;
  const transformScores = (fixture: FixtureResponse) => {
    const { goals } = fixture;
    const sameScore = findScore(goals)(fixturesResponse);
    const percentage = getPercentage(fixturesResponse.length, sameScore.length);
    console.log('eeeeeee', sameScore, goals, percentage);
    return { goals: getGoals(goals), percentage: `${percentage} %` };
  };
  const tableScorePercentage = map(transformScores, fixturesResponse);
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('score')}</TableCell>
            <TableCell>{t('percentage')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableScorePercentage.map(row => (
            <TableRow key={row.goals}>
              <TableCell component="th" scope="row">
                {row.goals}
              </TableCell>
              <TableCell align="right">{row.percentage}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ScoresHistoryPercentage;
