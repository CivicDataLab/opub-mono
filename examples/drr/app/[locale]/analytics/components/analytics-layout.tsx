export function Content({
    timePeriod,
    indicator,
  }: {
    timePeriod: string;
    indicator: string;
  }) {
    return (
        <p>{indicator}-{timePeriod}</p>
    )

  }