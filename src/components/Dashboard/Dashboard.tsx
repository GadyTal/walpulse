import { useFilters } from "../../context/FiltersContext/FilterContext";
import { useTransactions } from "../../context/TransactionContext/TransactionContext";
import { ChartsRow } from "../ChartsRow/ChartsRow";
import { StatsRow } from "../StatsRow/StatsRow";
import { TopRow } from "../TopRow/TopRow";
import { ErrorMessage } from "./Dashboard.styles";

export const Dashboard = () => {
  const { loading, error, refetchTransactions } = useTransactions();
  const { timeFilter, setTimeFilter } = useFilters();

  if (error) {
    return (
      <ErrorMessage>
        <p>Error: {error}</p>
        <button onClick={refetchTransactions}>
          Try Again
        </button>
      </ErrorMessage>
    );
  }

  return (
    <>
      <TopRow activeFilter={timeFilter} onFilterChange={setTimeFilter} />
      {loading ? (
        <>
          <StatsRow />
          <ChartsRow />
        </>
      ) : (
        <>
          <StatsRow />
          <ChartsRow />
        </>
      )}
    </>
  );
}; 