from django.db import models

class Play(models.Model):
    title = models.CharField(max_length=30)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Представление'
        verbose_name_plural = 'Представления'

class Hall(models.Model):
    name = models.CharField(max_length=25)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Зал'
        verbose_name_plural = 'Залы'

class Session(models.Model):
    play = models.ForeignKey(Play,on_delete=models.CASCADE)
    hall = models.ForeignKey(Hall,on_delete=models.CASCADE)

    start_time = models.DateTimeField()
    price = models.DecimalField(max_digits=8, decimal_places=2)

    class Meta:
        verbose_name = 'Сеанс'
        verbose_name_plural = 'Сеансы'

class Seat(models.Model):
    hall = models.ForeignKey(Hall, on_delete=models.CASCADE)

    x = models.IntegerField()
    y = models.IntegerField()
    
    occupied = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'Место'
        verbose_name_plural = 'Места'

class Ticket(models.Model):
    session = models.ForeignKey(Session,on_delete=models.CASCADE)
    seat = models.ForeignKey(Seat,on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Билет'
        verbose_name_plural = 'Билеты'
        constraints = [
            models.UniqueConstraint(
                fields=['session', 'seat'],
                name='unique_seat_for_session'
            )
        ]