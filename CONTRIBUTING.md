# Contributing

Thanks for helping. These scripts stay useful because their rules are exact, so contributions are held to that.

## Reporting a bug

Open a [bug report](https://github.com/srarr/proea-indicators/issues/new?template=bug_report.yml). The fastest fix
comes from four facts:

- the **symbol and exchange** (for example `OANDA:XAUUSD`);
- the **timeframe**;
- the **date and time** of the candle, with your chart's time zone;
- **what the script drew**, against **what its README's rule says it should**.

A screenshot helps. "It repaints" needs the candle where a mark appeared or moved after the close.

## Changing a rule

A rule change needs a source: the concept creator's own words, a paper, or the published rule of the ProEA desk the
script follows. Open an issue first, quoting the source, before you write code.

## Pull requests

- Pine Script **v6**, under the MPL-2.0 header the files already carry.
- Decide structure on **closed candles**. Use `barstate.isconfirmed` or closed-candle values. A higher timeframe is
  read with `[1]` and `lookahead_on`, never a forming candle.
- Comparisons stay **strict** where the README says so: a close exactly on an edge isn't through it.
- Update the indicator's `README.md` (its rule, settings and alerts) in the same pull request, plus `CHANGELOG.md`.
- The **compile check** must pass. It sends each script to TradingView's compiler, and any error or warning fails it.
  Run it locally with `node scripts/compile.mjs` (Node 20+).

## Code of conduct

This project follows the [Contributor Covenant](CODE_OF_CONDUCT.md).
