from rest_framework import serializers
from ..models import Bonus, BonusType
from ..utils.files import upload_to_bucket


class BonusTypeSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(source="image_url")

    class Meta:
        model = BonusType
        fields = ["id", "name", "points", "description", "image"]

    def create(self, validated_data):
        image_data = validated_data.pop("image_url")
        image_url = upload_to_bucket(
            files=image_data, path="images/bonuses/", bucket="carrentbucket"
        )
        validated_data.update({"image_url": image_url[0]})
        return super().create(validated_data)

    def update(self, instance, validated_data):
        image_data = validated_data.get("image_url")
        if image_data:
            image_url = upload_to_bucket(
                files=image_data, path="images/bonuses/", bucket="carrentbucket"
            )
            validated_data.update({"image_url": image_url[0]})
        return super().update(instance, validated_data)

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret.pop("image")
        ret.update({"image_url": instance.image_url})
        return ret


class BonusSerializer(serializers.ModelSerializer):
    proof_image = serializers.ImageField(source="proof_image_url")
    bonus_type_id = serializers.PrimaryKeyRelatedField(
        queryset=BonusType.objects.all(), source="bonus_type"
    )

    class Meta:
        model = Bonus
        fields = [
            "id",
            "user_id",
            "bonus_type_id",
            "proof_image",
            "is_accepted",
            "is_declined",
        ]
        read_only_fields = ["is_accepted", "is_declined"]

    def create(self, validated_data):
        image_data = validated_data.pop("proof_image_url")
        image_url = upload_to_bucket(
            files=image_data, path="images/bonuses_verify/", bucket="carrentbucket"
        )
        user = self.context["request"].user
        validated_data.update({"proof_image_url": image_url[0], "user": user})
        return super().create(validated_data)

    def accept(self):
        self.instance.add_to_user()
        self.instance.is_accepted = True
        self.instance.save()

    def decline(self):
        self.instance.is_declined = True
        self.instance.save()

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret.pop("proof_image")
        ret.update({"proof_image_url": instance.proof_image_url})
        return ret
