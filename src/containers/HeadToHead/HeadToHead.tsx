import React, { FunctionComponent } from 'react';
import { useQuery } from 'react-query';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Grid } from '@material-ui/core';
import { find, map, prop } from 'ramda';
import { FixtureResponse, FootballApiResult, ResponseTeams } from '../../definitions/types';
import { footballApiCall } from '../../core/httpCall';
import List from '../../components/List/List';
import HeadToHeadResult from './HeadToHeadResult/HeadToHeadResult';

const HeadToHead: FunctionComponent = () => {
  const { data: teamsResponse } = useQuery<FootballApiResult<ResponseTeams[]>, string>(
    'teams',
    () =>
      footballApiCall<FootballApiResult<ResponseTeams[]>>(
        `teams?league=${process.env.REACT_APP_LEAGUE}&season=${process.env.REACT_APP_SEASON}`,
      ),
  );

  const { data: fixtures } = useQuery<FootballApiResult<FixtureResponse[]>, string>(
    'fixtures',
    () =>
      footballApiCall<FootballApiResult<FixtureResponse[]>>(
        `fixtures?league=${process.env.REACT_APP_LEAGUE}&season=${process.env.REACT_APP_SEASON}`,
      ),
  );

  const [checked, setChecked] = React.useState<number[]>([]);

  const teams = map(prop('team'), teamsResponse?.data.response || []);
  const filterFixture = (fixtureResponse: FixtureResponse) => {
    const { home, away } = fixtureResponse.teams;

    const isHome = home.id === checked[0] || home.id === checked[1];
    const isAway = away.id === checked[0] || away.id === checked[1];
    return isHome && isAway;
  };
  const fixture = find(filterFixture, fixtures?.data.response || []);

  /*  const [episodes, setEpisodes] = React.useState<Partial<Character>[] | undefined>([]);
  const isSelected = (x: Character) => checked.includes(x.id);
  const characters = charactersResp?.results || [];
  const episodeIntersection = (acc: string[], x: Character) => intersection(acc, x.episode);
  const characterSelected = filter(isSelected);
  const composeWithPromise = (...args: any) =>
    composeWith((f, val) => {
      if (val && val.then) {
        return val.then(f);
      }
      if (Array.isArray(val) && val.length && val[0] && val[0].then) {
        return Promise.all(val).then(f);
      }
      return f(val);
    })(args); */

  // const episodesNumbers = map(test)(episodesUrls || []);
  // eslint-disable-next-line no-console

  /*  useEffect(() => {
    console.log('checked', checked, checked.length > 0 ? characters[0]?.episode : []);
    const reduceEpisodes = reduce(
      episodeIntersection,
      checked.length > 0 ? characters[0]?.episode : [],
    );
    const episodesUrls = compose<Character[], Character[], string[]>(
      reduceEpisodes,
      characterSelected,
    )(characters);
    const episodesNumbers = map(
      compose<string, string[], string, number>(
        (x: string) => parseInt(x, 10),
        last,
        (x: string) => x.split('/'),
      ),
    )(episodesUrls || []);
    const episodesList = composeWithPromise(
      map(pick(['name'])),
      Promise.all.bind(Promise),
      map(getEpisode),
    )(episodesNumbers || []);
    if (episodesList instanceof Promise) {
      episodesList.then((episodesNames: Partial<Character>[]) => {
        setEpisodes(episodesNames);
      });
    }
  }, [characters, checked]); */

  const handleSelectCountry = (value: number) => {
    return () => {
      const newChecked = [...checked];
      toggleCountry(newChecked, value);
      setChecked(newChecked);
    };
  };

  const toggleCountry = (countries: number[], country: number) => {
    const currentIndex = checked.indexOf(country);
    if (currentIndex === -1) {
      if (checked.length === 2) {
        countries.splice(currentIndex, 1);
      }
      countries.push(country);
    } else {
      countries.splice(currentIndex, 1);
    }
    return countries;
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item sm={6}>
          <List items={teams} hasCheckBox onChange={handleSelectCountry} checked={checked} />
        </Grid>
        <Grid item sm={6}>
          {fixture && <HeadToHeadResult fixtureResponse={fixture} />}
        </Grid>
      </Grid>
    </>
  );
};

export default HeadToHead;
