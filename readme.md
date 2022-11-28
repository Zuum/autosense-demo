# Requirements

[Original task pdf](https://github.com/Zuum/autosense-demo/blob/master/docs/task.pdf)

# API Reference

[Postman](https://documenter.getpostman.com/view/24654802/2s8YsxuBWm)
[Swagger]()

# Running locally

`docker compose up`

# Limitations and assumptions

+ Cities should be validated to exclude typos on user end
+ Prices better be stored in lowest denomination possible, to avoid issues with floats precision (e.g. price everything in euro cents)
+ Injection of dependencies in project is done manually. Use of DI frameworks is possible, but the syntax for them may be too complicated, and I decided to not include them
+ MongoDB as a DB choice is dictated only for speed of delivery of task. SQL databases would require migrations, plugins to support geospatial indexes, normalization conflicting with json dump provided (so projection may be necessary).

+ Data Transfer Objects are not used
+ Modules are not used
+ Rule for unused vars is off "no-unused-vars": "off"
+ DB Driver implementation includes all station methods. It would have been better to have it as separate Service (aka StationService) entity, but as the project includes only stations I decided to leave it as is.

+ Logging should be changed a bit for better usability: morgan logs can be logged in separate file, JSON log format is better for exporting it into visual tools, correlationId would be necessary.
+ Tracing with [Jaeger](https://www.jaegertracing.io/) \ [OpenTelemetry](https://opentelemetry.io/) should be added. Tracing is always a good thing to have.

+ List filters can be expanded with lots of options: pump availability, price ranges, name search, address search


## Cache
[Quad-trees are used for location services](https://engblog.yext.com/post/geolocation-caching)
Not implemented currently. DB indexes provide acceptable baseline performance.
