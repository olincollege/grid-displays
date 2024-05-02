# grid-displays

## Introduction

Increasing carbon dioxide and other greenhouse gases in the atmosphere are
contributing to a changing climate, and electric power generation is a huge
emitter of these gases. Additionally, more and more of the world we live in is
being powered by electricity, so the price of power and the amount of carbon
dioxide generating power emits is becoming more important. Price and carbon
intensity of power vary drastically by location and time (and season) due to a
number of factors, but there aren’t many accessible tools for anyone to get this
information easily.

We built a tool to start to solve the accessibility problem, pulling data from
the regional transmission operator managing the power grid across much of the
Midwest and parts of the South. We processed this data to pare it down to the
relevant metrics, then built a user-friendly website to display it.

People who could use this range from individuals wanting to learn more about the
impact the power that runs their lightbulbs, to tech companies like Amazon and
Google trying to make their massive data centers more environmentally-friendly
and profitable.

## Key Terms

- Grid: System of power generation, transmission lines, substations, and
  distribution networks
- Load: Total demand for electricity
- Emission: Carbon dioxide (or other greenhouse gas) being released into the
  atmosphere
- MW: 1 million watts. Enough to power about 750 American homes
- LMP: Price of wholesale electricity at a given point on the grid, $/MWh

## Interesting Challenges

More of a choice than a challenge, but we had to decide how to store the data
we’d be passing to the frontend. We considered going with a full database
(likely structured, since it’s easier to query and slice, and the data we’re
working with fits nicely into a structured database) but decided to go with a
simple CSV file which we’d load entirely into memory with each API call, since
the size of the data was so small (1.4MB) and it let us get an initial version
up and running more quickly.

We debated on how to structure the frontend and backend interactions. Should we
store the data? Should we make an API call with the specific requirements of
each page? Ultimately we decided that if we wanted to integrate this with an
external API in the future, the fewer API calls the better. This was possible
logistically due to the fact that we weren’t calling an extremely, large amount
of data.

It was a challenge to figure out how we were going to structure our frontend
components. We initially started with a line graph component that took in the
data and cols as arguments but quickly realised that the number of arguments
required to make the plots we wanted was not feasible. From there, we decided
that because we aren’t offering much change in the graphs other than the span of
time plotted it would make more sense to let each type of graph (load,
emissions, etc.) be its own component.

## How to run the code

To install dependencies, run `pip install -r requirements.txt`

To run the flask server, run `python app/app.py` from the root of this project

An example API query:
`http://127.0.0.1:5000/data/?cols=load-mw&cols=LMP&cols=emissions_intensity&start_timestamp=2024-03-02-16-05&end_timestamp=2024-03-02-18-05`

After starting the API, you can navigate to the frontend folder and run the
following commands:

`npm install`

This command installs all the dependencies listed in the package.json file of
your project. You must run this the first time you open the project.

`npm start`

Runs the app in the development mode. Open
[http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes. You may also see any lint errors in
the console.


## Contributors

This project was created by Hanuman Vakil and Shreenithi Madan for the WebDev final project
