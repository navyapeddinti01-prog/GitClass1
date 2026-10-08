/* ==================================================
   ONLINE TICKET BOOKING JAVASCRIPT
================================================== */


/* ==================================================
   VARIABLES
================================================== */

let selectedMovie = "";

let selectedSeats = [];

let ticketPrice = 0;


/* ==================================================
   MOVIE PRICES
================================================== */

const moviePrices = {

    "Avengers": 200,

    "Inception": 180,

    "Interstellar": 220

};


/* ==================================================
   SCROLL TO MOVIES
================================================== */

function scrollToMovies() {

    const moviesSection = document.getElementById("movies");

    moviesSection.scrollIntoView({
        behavior: "smooth"
    });

}


/* ==================================================
   SELECT MOVIE
================================================== */

function selectMovie(movieName) {

    selectedMovie = movieName;

    ticketPrice = moviePrices[movieName];

    document.getElementById("selected-movie").textContent =
        movieName;

    document.getElementById("booking").scrollIntoView({
        behavior: "smooth"
    });

    updateSummary();

}


/* ==================================================
   SELECT SEAT
================================================== */

function selectSeat(seat) {

    /*
        If no movie is selected,
        ask the user to select a movie first.
    */

    if (selectedMovie === "") {

        alert("Please select a movie first.");

        return;

    }


    /*
        Get the seat number.
    */

    const seatNumber = seat.textContent.trim();


    /*
        Check whether the seat is already selected.
    */

    if (selectedSeats.includes(seatNumber)) {

        /*
            Remove the seat.
        */

        selectedSeats =
            selectedSeats.filter(
                function(item) {
                    return item !== seatNumber;
                }
            );

        seat.classList.remove("selected");

    }

    else {

        /*
            Add the seat.
        */

        selectedSeats.push(seatNumber);

        seat.classList.add("selected");

    }


    updateSummary();

}


/* ==================================================
   UPDATE BOOKING SUMMARY
================================================== */

function updateSummary() {

    /*
        Display selected seats.
    */

    const seatsElement =
        document.getElementById("selected-seats");


    if (selectedSeats.length === 0) {

        seatsElement.textContent = "None";

    }

    else {

        seatsElement.textContent =
            selectedSeats.join(", ");

    }


    /*
        Display number of tickets.
    */

    document.getElementById("ticket-count").textContent =
        selectedSeats.length;


    /*
        Calculate total price.
    */

    const total =
        selectedSeats.length * ticketPrice;


    /*
        Display total price.
    */

    document.getElementById("total-price").textContent =
        total;

}


/* ==================================================
   BOOKING FORM
================================================== */

const bookingForm =
    document.getElementById("booking-form");


bookingForm.addEventListener(
    "submit",
    function(event) {

        /*
            Prevent page refresh.
        */

        event.preventDefault();


        /*
            Check movie selection.
        */

        if (selectedMovie === "") {

            alert("Please select a movie.");

            return;

        }


        /*
            Check seat selection.
        */

        if (selectedSeats.length === 0) {

            alert("Please select at least one seat.");

            return;

        }


        /*
            Get customer name.
        */

        const name =
            document.getElementById("name").value;


        /*
            Display confirmation message.
        */

        const confirmationMessage =
            document.getElementById("confirmation-message");


        confirmationMessage.textContent =
            "Thank you " +
            name +
            "! Your " +
            selectedMovie +
            " ticket has been booked for seat(s): " +
            selectedSeats.join(", ") +
            ". Total amount: ₹" +
            (selectedSeats.length * ticketPrice) +
            ".";


        /*
            Show confirmation section.
        */

        const confirmation =
            document.getElementById("confirmation");


        confirmation.classList.add("show");


        /*
            Scroll to confirmation.
        */

        confirmation.scrollIntoView({
            behavior: "smooth"
        });

    }
);


/* ==================================================
   RESET BOOKING
================================================== */

function resetBooking() {

    /*
        Clear movie.
    */

    selectedMovie = "";


    /*
        Clear seats.
    */

    selectedSeats = [];


    /*
        Clear price.
    */

    ticketPrice = 0;


    /*
        Remove selected class
        from all seats.
    */

    const seats =
        document.querySelectorAll(".seat");


    seats.forEach(
        function(seat) {

            seat.classList.remove("selected");

        }
    );


    /*
        Reset summary.
    */

    document.getElementById("selected-movie").textContent =
        "None";

    document.getElementById("selected-seats").textContent =
        "None";

    document.getElementById("ticket-count").textContent =
        "0";

    document.getElementById("total-price").textContent =
        "0";


    /*
        Reset form.
    */

    bookingForm.reset();


    /*
        Hide confirmation.
    */

    document
        .getElementById("confirmation")
        .classList.remove("show");


    /*
        Go back to movies.
    */

    document
        .getElementById("movies")
        .scrollIntoView({
            behavior: "smooth"
        });

}