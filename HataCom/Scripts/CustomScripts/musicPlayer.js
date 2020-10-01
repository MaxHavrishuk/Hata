$(document).ready(function () {
    var idSong, song, i, mute = false, volume = 1,
            songs = [
           [0, 'Karpyuk', 'No Answers', 'https://drive.google.com/uc?export=download&id=133Oel8COzerC7m63ObhxyNDeL8lDu42F', '235.5035'],
            [1, 'STP', 'On the edge', 'https://drive.google.com/uc?export=download&id=1dgbYB_TSaSbzwU_ZHq4du1AubDOnqreT', '214.4376'],
            [2, 'Karpyuk', 'Runaway', 'https://drive.google.com/uc?export=download&id=1xI8Ee25fosEwT1EQrSlXtuII2xknNu1S', '256.8011'],
            [3, 'Karpyuk', 'Runaway', 'https://drive.google.com/uc?export=download&id=1xI8Ee25fosEwT1EQrSlXtuII2xknNu1S', '256.8011'],
           
        ];
    


    // <SONG DURATION> 
    // song = new Audio(songs[2][3]);
    // song.addEventListener('loadedmetadata', function () {
    //     console.log(this.duration);
    // });
    // </SONG DURATION>    

 

    for (i = 0; i < songs.length; i++) {
        $('.wrp').append(`
        <div class="songItem" id="songItem`+ songs[i][0] + `">
            <!-- BTN CONTROL -->
            <div class="btnPlayPauseSongItem" id="`+ songs[i][0] + `"></div>
            <div class="logoSongItem" id="logoSongItem`+ songs[i][0] + `"></div>
            <!-- SONG NAME -->
            <div class="songNameSongItem" id="songNameSongItem`+ songs[i][0] + `">
                <span class="authorNameSongItem" id="authorNameSongItem`+ songs[i][0] + `"><b>` + songs[i][1] + `</b></span><br>
                <span class="trackNameSongItem" id="trackNameSongItem`+ songs[i][0] + `">` + songs[i][2] + `</span>
            </div>
            <!-- PROGRESS LINE -->
            <div class="barSongItem" id="barSongItem`+ songs[i][0] + `">
                <div class="setTimeSongItem" id="setTimeSongItem`+ songs[i][0] + `">0:00</div>
                <div class="rangeSongItem" id="rangeSongItem`+ songs[i][0] + `">
                    <div class="progressSongItem" id="progressSongItem`+ songs[i][0] + `"></div>
                    <div class="loadSongItem" id="loadSongItem`+ songs[i][0] + `"></div>
                </div>
            </div>
            <!-- TIME/DURATION -->
            <div class="timeSongItem" id="timeSongItem`+ songs[i][0] + `">0:00</div>
            <div class="slashSongItem" id="slashSongItem`+ songs[i][0] + `">/</div>
            <div class="durationSongItem" id="durationSongItem`+ songs[i][0] + `">` + parseInt(songs[i][4] / 60) + ':' + parseInt(songs[i][4]) % 60 + `</div>
        </div>`);
    }

    $('.btnPlayPauseSongItem, .btnPlayPause').on('click', function () {
        var id = $(this).attr('id');
        playPauseSong(id);
        $('.btnNext#next').attr('data-id', ++id);
        $('.btnPrevious#previous').attr('data-id', id - 2);
    });

    $('.btnNext, .btnPrevious').on('click', function () {
        var id = $(this).attr('data-id');
        if (id != -1) {
            playPauseSong(id);
            $('.btnNext#next').attr('data-id', ++id);
            $('.btnPrevious#previous').attr('data-id', id - 2);
        }
    });

    $('.btnStop').on('click', function () {
        song.pause();
        resetPlayer();
        setTimeout(function () {
            $('.panel').css('opacity', '0')
        }, 1000);
    });

    $('.mute').on('click', function () {
        if (song) {
            if (mute == false) {
                mute = true;
                $('.mute').css('background', 'url("/webplayer/img/Mute.svg") center no-repeat');
                $('.volume').val(0);
            }
            else {
                mute = false;
                $('.mute').css('background', 'url("/webplayer/img/Volume.svg") center no-repeat');
                $('.volume').val(100);
            }
            song.muted = mute;
        }
    });

    $('.volume').on('change', function () {
        var val = $(this).val();
        if (song) {
            volume = val / 100;
            song.volume = volume;
            if (val == 0) {
                mute = true;
                $('.mute').css('background', 'url("/webplayer/img/Mute.svg") center no-repeat');
            }
            else if (val > 0) {
                mute = false;
                $('.mute').css('background', 'url("/webplayer/img/Volume.svg") center no-repeat');
            }
        }
    });

    $('.range').on('mouseenter', function () {
        if (song) {
            var id = $('.btnPlayPause, btnPlayPause2').attr('id'),
                offset = $(this).offset(),
                dur = songs[id][4],
                rangeWidth = $(this).width();
            $('.setTime').show();
            $('.range').on('mousemove', function (e) {
                var x = e.pageX - offset.left,
                    xproc = (x * 100) / rangeWidth,
                    sec = (xproc * dur) / 100;
                $('.setTime').css({ 'left': x - 10 });
                $('.setTime').text(parseInt(sec / 60) + ':' + parseInt(sec % 60));
                $('.range').on('click', function () {
                    xproc = xproc - 100;
                    $('.progress').css({ 'left': xproc + '%' });
                    song.currentTime = sec;
                });
            });
        }
    });

    $('.range').on('mouseout', function () {
        $('.setTime').hide();
    });

    function playPauseSong(id) {
        if (song) {
            if (id == idSong) {
                if (song.paused) {
                    song.play();
                    $('#' + id).removeClass('btnPlayPauseSongItemActive2').addClass('btnPlayPauseSongItemActive');
                    $('.btnPlayPause').css('background', 'url("/webplayer/img/Pause.svg") center no-repeat');
                    classReplacement(id);
                }
                else {
                    song.pause();
                    $('#' + id).removeClass('btnPlayPauseSongItemActive').addClass('btnPlayPauseSongItemActive2');
                    $('.btnPlayPause').css('background', 'url("/webplayer/img/Play.svg") center no-repeat');
                }
            }
            else {
                song.pause();
                resetPlayer();
                $('.btnPlayPause').css('background', 'url("/webplayer/img/Pause.svg") center no-repeat');
                playNewSong(id);
            }
        }
        else {
            playNewSong(id);
        }
    }

    function playNewSong(id) {
        var curtime, cur = -100;

        $('.authorName').text(songs[id][1]);
        $('.trackName').text(songs[id][2]);
        $('.btnPlayPause').attr('id', id);
        classReplacement(id);
        idSong = id;
        song = new Audio(songs[id][3]);
        song.play();
        song.volume = volume;
        song.addEventListener('timeupdate', function () {
            curtime = song.currentTime;
            cur = -((songs[idSong][4] - curtime) * 100) / songs[idSong][4];
            $('.time').text(parseInt(curtime / 60) + ':' + parseInt(curtime % 60));
            $('#timeSongItem' + id).text(parseInt(curtime / 60) + ':' + parseInt(curtime % 60));
            $('.progress').css({ 'left': cur + '%' });
            $('#progressSongItem' + id).css({ 'left': cur + '%' });
            $('.duration').text('/' + parseInt(songs[id][4] / 60) + ':' + parseInt(songs[id][4] % 60));
        });
        song.addEventListener('progress', function () {
            var load = song.buffered.end(0);
            load = -((songs[idSong][4] - load) * 100) / songs[idSong][4];
            $('.load').css({ 'left': load + '%' });
        });
    }

    function classReplacement(id) {
        $('#songItem' + id).removeClass('songItem').addClass('songItemActive');
        $('#' + id).addClass('btnPlayPauseSongItemActive');
        $('#logoSongItem' + id).removeClass('logoSongItem').addClass('logoSongItemActive');
        $('#songNameSongItem' + id).removeClass('songNameSongItem').addClass('songNameSongItemActive');
        $('#authorNameSongItem' + id).removeClass('authorNameSongItem').addClass('authorNameSongItemActive');
        $('#trackNameSongItem' + id).removeClass('trackNameSongItem').addClass('trackNameSongItemActive');
        $('#barSongItem' + id).removeClass('barSongItem').addClass('barSongItemActive');
        $('#setTimeSongItem' + id).removeClass('setTimeSongItem').addClass('setTimeSongItemActive');
        $('#rangeSongItem' + id).removeClass('rangeSongItem').addClass('rangeSongItemActive');
        $('#progressSongItem' + id).removeClass('progressSongItem').addClass('progressSongItemActive');
        $('#loadSongItem' + id).removeClass('loadSongItem').addClass('loadSongItemActive');
        $('#timeSongItem' + id).removeClass('timeSongItem').addClass('timeSongItemActive');
        $('#durationSongItem' + id).removeClass('durationSongItem').addClass('durationSongItemActive');
        $('#slashSongItem' + id).removeClass('slashSongItem').addClass('slashSongItemActive');
        $('.panel').css('opacity', '1');
    }

    function resetPlayer() {
        song.currentTime = 0;
        $('.songItemActive').removeClass('songItemActive').addClass('songItem');
        $('.btnPlayPauseSongItem').removeClass('btnPlayPauseSongItemActive');
        $('.btnPlayPauseSongItem').removeClass('btnPlayPauseSongItemActive2');
        $('.logoSongItemActive').removeClass('logoSongItemActive').addClass('logoSongItem');
        $('.songNameSongItemActive').removeClass('songNameSongItemActive').addClass('songNameSongItem');
        $('.authorNameSongItemActive').removeClass('authorNameSongItemActive').addClass('authorNameSongItem');
        $('.trackNameSongItemActive').removeClass('trackNameSongItemActive').addClass('trackNameSongItem');
        $('.barSongItemActive').removeClass('barSongItemActive').addClass('barSongItem');
        $('.setTimeSongItemActive').removeClass('setTimeSongItemActive').addClass('setTimeSongItem');
        $('.rangeSongItemActive').removeClass('rangeSongItemActive').addClass('rangeSongItem');
        $('.progressSongItemActive').removeClass('progressSongItemActive').addClass('progressSongItem');
        $('.loadSongItemActive').removeClass('loadSongItemActive').addClass('loadSongItem');
        $('.timeSongItemActive').removeClass('timeSongItemActive').addClass('timeSongItem');
        $('.durationSongItemActive').removeClass('durationSongItemActive').addClass('durationSongItem');
        $('.slashSongItemActive').removeClass('slashSongItemActive').addClass('slashSongItem');
    }
});