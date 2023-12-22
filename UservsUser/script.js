var currentPlayer = 'X';
    var board = ['', '', '', '', '', '', '', '', ''];
    var user1icon ='X';
    var user2icon ='O';
    var gameActive = true;

    // Function to check for a winner
    function checkWinner() {
        var winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (var i = 0; i < winningCombinations.length; i++) {
            var [a, b, c] = winningCombinations[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }

        // Check for a tie
        if (!board.includes('')) {
            return 'T';
        }

        return null;
    }

    // Function to handle player's move
    function makeMove(square) {
        var index = parseInt(square.attr('id'));
        
        if (board[index] === '' && gameActive) {
            board[index] = currentPlayer;
            square.text(currentPlayer);

            var winner = checkWinner();
            if (winner) {
                endGame(winner);
            } else {
                currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
            }
        }
    }

    // Function to end the game and show the result
    function endGame(winner) {
        gameActive = false;

        if (winner === 'T') {
            $('.end-game-modal h3').text('It\'s a Tie🙂!');
        } else {
            $('.end-game-modal h3').text(winner + ' Wins!😃');
        }

        $('.modal-container').css('display', 'block');
        $('.end-game-modal').css('display','block').removeClass('animated bounceOutDown').addClass('animated bounceInUp');

        $('.button-area span').click(function() {
        
            $('.end-game-modal').removeClass('animated bounceInUp').addClass('animated bounceOutDown');
            
            setTimeout(function() {
            $('.modal-container').css('display', 'none');
            resetGame();
            }, 700);
            
            $('.button-area span').off();
        });
    }

    // Function to reset the game
    function resetGame() {
        $('.square').text('');
        board = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        $('.end-game-modal').hide();
    }

    // Event listener for square clicks
    $('.square').on('click', function () {
        makeMove($(this));
        $('.square:contains(X)').addClass('x-marker');
        $('.square:contains(O)').addClass('o-marker');
    });

    // Event listener for marker selection
    $('.x-marker, .o-marker').on('click', function () {
        currentPlayer = $(this).text();
        $('.choose-modal').hide();
    });

    // Event listener for play again button
    $('.end-game-modal span').on('click', function () {
        resetGame();
    });

    function chooseXorO() {
        $('.modal-container').css('display', 'block');
        $('.choose-modal').addClass('animated bounceInUp');
        
        $('.button-area span').click(function() {
          var marker = $(this).text();
          user1icon = (marker === 'X' ? 'X' : 'O');
          user2icon = (marker === 'X' ? 'O' : 'X');
      
          $('.choose-modal').addClass('animated bounceOutDown');
          setTimeout(function() {
            $('.modal-container').css('display', 'none');
            $('.choose-modal').css('display','none');
            resetGame();
          }, 700);
          
          $('.button-area span').off();
        });
      }

      chooseXorO();
