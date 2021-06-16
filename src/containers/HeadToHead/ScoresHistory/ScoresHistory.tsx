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
import { FixtureResponse } from '../../../definitions/types';
import { getGoals } from '../../../utils/utils';

interface ScoresHistoryProps {
  fixturesResponse: FixtureResponse[];
}

const ScoresHistory: FunctionComponent<ScoresHistoryProps> = ({ fixturesResponse }) => {
  const { t } = useTranslation();
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('score')}</TableCell>
            <TableCell>{t('date')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fixturesResponse.map(row => (
            <TableRow key={row.fixture.id}>
              <TableCell component="th" scope="row">
                {getGoals(row.goals)}
              </TableCell>
              <TableCell align="right">{new Date(row.fixture.date).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ScoresHistory;
