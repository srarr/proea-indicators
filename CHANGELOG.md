# Changelog

All notable changes to these indicators. Dates are UTC. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow [Semantic Versioning](https://semver.org/): a change to a rule is a minor version, a change that alters past marks is a major one.

## [1.0.0] - 2026-10-27

First public release. Every script compiles on TradingView's Pine v6 compiler with no errors and no warnings.

### Added
- **Fractal Model: CRT + CISD.** C1's range from the last closed higher-timeframe candle, the one-sided sweep, the CISD and C2's close back inside C1. Four alerts.
- **IFVG: Inverse FVG on a Close.** Fair value gaps of at least 0.05 ATR, flipped by a strict close beyond the far edge; ended by a close beyond the other edge, or after 180 candles. Two alerts.
- **Order Blocks & FVG.** Order blocks on a close through a confirmed 15-candle swing, fair value gaps of at least 0.25 ATR, each printed with displacement (ATR) and volume ratio. Four alerts.
- **Gold Session Pools.** Yesterday's, Asia's and London's highs and lows on New York time; raids in the London and New York windows marked SWEPT or HELD. Two alerts.
- **Prop Drawdown Lines.** Daily loss and drawdown floors (static or trailing with a lock) as dollars and as prices for one open position. Two alerts.
- **ETF Levels on Futures.** SPY, QQQ, SPX or NDX levels on the ES or NQ chart at the live ratio or basis.
- **Expected Move Lines.** ±1 and ±2 standard deviations around yesterday's close from the VIX or a typed IV.
- CI: every script compiled on TradingView on each push, pull request and Monday.

[1.0.0]: https://github.com/srarr/proea-indicators/releases/tag/v1.0.0
